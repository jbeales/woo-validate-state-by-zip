/**
 * This is a utility to be used on the Wikipedia page on ZIP code prefixes,
 * ( https://en.wikipedia.org/wiki/List_of_ZIP_code_prefixes ), to extract an
 * array of prefixes and states.
 *
 * Each ZIP may span multiple states, so the keys are ZIP prefixes, and the values
 * are arrays of possible states for the ZIP prefix.
 *
 * IMPORTANT: Make sure to merge the output of this function with the multi-state ZIPs
 * found here: https://gis.stackexchange.com/a/223445/102779
 */


function zbs_extract() {

	// each table cell has a structure like this:
	// <td><b>011 <a href="..." title="State Name">NY</a></b>.....</td>
	// The data we care about is in the <b>, so let's grab them
	var raw = document.querySelectorAll('#mw-content-text td>b'),
		cell,
		a,
		complete = {},
		php = '';

	// now split the data into prefix & state.
	for( cell in raw ) {
		a = false;
		key = val = '';
		if( raw.hasOwnProperty(cell)) {
			// look for an <a> tag in the cell.
			a = raw[cell].querySelector('a');
			if( a ) {
				key = raw[cell].innerText;
				key = key.replace(a.innerText, '');
				key = key.replace(' ', '');
				key = key.replace('†', '');
				key = key.replace('*', '');
				
				complete[key] = a.innerText;

				php += "'" + key + "' => ['" + a.innerText + "'],\n";
			}
			
		}
	}

	php = php.replace(/,\w$/, '' );
	console.log(php);

	return complete;
}