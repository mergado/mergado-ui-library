#!/usr/bin/env php
<?php

/**
 * For icons, we're using SVG sprite technique. This big svg would be PITA to
 * maintain, so source icons are in single files. This script takes all .svg
 * files from given folder (recursively) and combines them into that svg sprite.
 */

// Some setup.
$inputPath = __DIR__ . '/../icons';
$outputPath = realpath(__DIR__ . '/../build') . '/muil.icons.svg';


/**
 * Read directory recursively and return it's content in array filename => file content.
 *
 * @param string Icon directory location.
 * @param string Icon prefix (directory name) - used when called recursively.
 * @return array<iconName, svgCode>
 */
function readIcons(string $path, string $prefix = ''): array {
	$icons = [];

	foreach (new FilesystemIterator($path) as $fileInfo) {
		if ($fileInfo->getExtension() === 'svg') {
			$id = $fileInfo->getBasename('.svg');
			$id = $prefix ? $prefix . '-' . $id : $id;
			$icons[$id] = file_get_contents($fileInfo->getPathname());
		} elseif ($fileInfo->isDir()) {
			$dirName = $fileInfo->getFilename();
			$icons = array_merge($icons, readIcons($fileInfo->getRealPath(), $dirName));
		}
	}

	return $icons;
}

/**
 * Convert SVG file into SVG symbol tag.
 *
 * @param string Icon SVG source.
 * @param string Icon name
 * @return string
 */
function fileToSymbol(string $svg, string $id): string {
	$svg = str_replace('  ', null, $svg);
	$svg = str_replace("\n", null, $svg);
	$svg = str_replace(' xmlns="http://www.w3.org/2000/svg"', null, $svg);
	$svg = str_replace('<svg ', sprintf('<symbol id="%s" ', $id), $svg);
	$svg = str_replace('</svg>', '</symbol>', $svg);

	// Unfuck firefox.
	$svg = preg_replace('/ width="[0-9]+"/', null,  $svg);
	$svg = preg_replace('/ height="[0-9]+"/', null,  $svg);

	return trim($svg) . PHP_EOL;
}


// Read symbols.
$symbols = [];
$icons = readIcons($inputPath);
$count = count($icons);
echo "Processing $count files \n";
foreach ($icons as $id => $svg) {
	$symbols[$id] = fileToSymbol($svg, $id);
	echo ".";
}

ksort($symbols);

echo "\n";
echo "Exporting sprite: $outputPath";

// Write sprite.
file_put_contents($outputPath, sprintf(
	'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0">%s</svg>%s',
	implode('', $symbols), PHP_EOL
));
echo "\n";

