"use strict";

// It's currently unknown if `"googlebot: unavailable_after: …"` is possible, so it's not supported
// Also, "googlebot: …" is not possible:
// https://github.com/nodejs/node/issues/3591#issuecomment-174228262
const prefixPattern = /^(?:\s*([^:,]+):)?\s*(.+)?$/;



const splitDirectives = directives =>
{
	const result = { prefix:null, values:null };

	directives = prefixPattern.exec(directives) ?? [];

	if (directives[1] !== undefined)
	{
		result.prefix = directives[1].toLowerCase();
	}

	if (directives[2] !== undefined)
	{
		if (result.prefix === "unavailable_after")
		{
			result.values = [ directives[2].toLowerCase() ];
		}
		else
		{
			result.values = directives[2].toLowerCase().split(",");
		}
	}
	else
	{
		result.values = [];
	}

	return result;
};



module.exports = splitDirectives;
