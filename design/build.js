const StyleDictionary = require('style-dictionary');
console.log('\nBuild started...');
console.log('==============================================');

function isPercentage(str) {
  return /^\d+%$/.test(str);
}

function getOpacity(input) {
  if (isPercentage(input)) {
    return parseFloat(input) / 100;
  }

  return input
}

function rgbaToObject(rgba) {
  const regex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
  const result = regex.exec(rgba);
  if (result) {
    return {
      r: parseInt(result[1], 10),
      g: parseInt(result[2], 10),
      b: parseInt(result[3], 10),
      a: result[4] ? parseFloat(result[4]) : 1
    };
  }
  return null;
}

function hexToRgba(input) {
  if (input.startsWith("rgb(") || input.startsWith("rgba(")) {
    return rgbaToObject(input)
  }

  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  input = input.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(input);
  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: 1
    };
  }

  console.log('Failed...');
  return null;
}


StyleDictionary.registerFormat({
  name: 'android/radius',
  formatter: function({ dictionary }) {
    return `<?xml version= \"1.0\" encoding=\"utf-8\"?>\n<resources>\n
    ${dictionary.allTokens.map(function(token) {
    return `<dimen name="${token.name}">${Math.round(eval(token.value))}dp</dimen>`;
    }).join('\n')}\n
    </resources>
    `;
  }

});

StyleDictionary.registerFormat({
  name: 'android/spacing',
  formatter: function({ dictionary }) {
    return `<?xml version= \"1.0\" encoding=\"utf-8\"?>\n<resources>\n
     ${dictionary.allTokens.map(function (token) {
     if (!token.name.includes("desktop_")) {
     return `<dimen name="${token.name.replace("mobile_", "")}">${Math.round(eval(token.value))}dp</dimen>`;}
      })
      .filter(Boolean) // Remove undefined entries
      .join("\n")}
      </resources>`;
  }
});


StyleDictionary.registerFormat({
  name: 'android/font',
  formatter: function({ dictionary }) {
  return `<?xml version= \"1.0\" encoding=\"utf-8\"?>\n<resources>\n
   ${dictionary.allTokens.map(function(token) {
   if (!(typeof token.description === `string`)) {
    return ``
   }
   return `<string name="${token.name}">${token.description.replace("&","&amp;")}</string>`;
   }).join('\n')}\n
   </resources>

   `;
  }
});

StyleDictionary.registerFormat({
  name: 'android/lineHeight',
  formatter: function({ dictionary }) {
    return `<?xml version= \"1.0\" encoding=\"utf-8\"?>\n<resources>\n
    ${dictionary.allTokens.map(function(token) {
    return `<fraction name="${token.name}">${token.value}</fraction>`;
    }).join('\n')}\n
    </resources>
    `;
  }
});

StyleDictionary.registerFormat({
  name: "android/color",
  formatter: function({ dictionary }) {
    return `<?xml version= \"1.0\" encoding=\"utf-8\"?>\n<resources>\n
    ${dictionary.allTokens.map(function(token) {
    return `<color name="${token.name}">${token.value}</color>`;
    }).join('\n')}\n
    </resources>
    `;
    }
 });

StyleDictionary.registerFormat({
   name: 'android/opacity',
   formatter: function ({ dictionary }) {
   return `<?xml version= \"1.0\" encoding=\"utf-8\"?>\n<resources>\n
       ${dictionary.allTokens.map(function(token) {
       return `<item name="${token.name}" type= \"dimen\" format=\"float\" >${token.value}</item>`;
       }).join('\n')}\n
       </resources>
       `;
       }
});

const StyleDictionaryExtended = StyleDictionary.extend(__dirname + '/config.json');
StyleDictionaryExtended.buildAllPlatforms();

console.log('\n==============================================');
console.log('Build completed!');