import PreppyCamera from './Camera';
import React from 'react';
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { TextractClient, AnalyzeDocumentCommand } from "@aws-sdk/client-textract";

const client = new TextractClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'AKIASV7CDFJONFKYMMEE',
    secretAccessKey: '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',
  }
});

//const fs = require('fs');

// @todo unit tests

// fetch from DB instead
const nutrients = [
  //'amount per serving',
  'added *sugars',
  'biotin',
  'calcium',
  'calories',
  'chloride',
  'cholesterol',
  'choline',
  'chromium',
  'copper',
  'dietary *fiber',
  'folate',
  'iodine',
  'iron',
  'magnesium',
  'manganese',
  'molybdenum',
  'niacin',
  'panthothenic acid',
  'phosphorus',
  'potassium',
  'protein',
  'riboflavin',
  'saturated *fat',
  'selenium',
  'serving size',
  'servings per',
  'sodium',
  'thiamin',
  'total *carbohydrate',
  'total *fat',
  'total *sugars',
  'trans *fat',
  'vitamin a',
  'vitamin b6',
  'vitamin b12',
  'vitamin c',
  'vitamin d',
  'vitamin e',
  'vitamin k',
  'zinc',
];
const REGEX_NUTRIENT = new RegExp('(' + nutrients.join('|') + ')', 'i');
const units = [
  'g',
  'mcg',
  'mg',
  'oz',
  'tbsp',
  'tsp',
];
const REGEX_UNIT = '(' + units.join('|') + ')';
const REGEX_NUMBER = "[0-9]*[.,O]?[0-9]";

// @todo account for zeroes masquerading as O's
// @todo fix for calories
const REGEX_AMOUNT = REGEX_NUMBER + "(?!%)";// + REGEX_UNIT;
const REGEX_PERCENTAGE = REGEX_NUMBER + " *%";

const requiresPercentage = fact => {
  return typeof fact.percentage === 'undefined'
    && typeof fact.nutrient !== 'undefined'
    && fact.nutrient.match(/(calories|protein|trans *fat|total *sugars)/i) === null;
};

const fixOhsThatShouldBeZeroes = str => {
  units.forEach(unit => {
    str = str.replace('O' + unit, '0' + unit);
  });
  return str;
};

// @todo handle multiple amounts, such as in serving size
const getAmount = str => {
  if (str.match(/ /) !== null) {
    arr = str.split(' ');
    while (arr.length > 0) {
      last = arr.pop();
      const amount = getAmount(last)
      if (amount) {
        return amount
      }
    }
  }

  //match = re.search(regex_amount(), str, re.IGNORECASE)
  match = str.match(REGEX_AMOUNT);

  // @todo fix replacement of decimal points
  return match ? match[0] : getCalories(str);
};

const firstMatch = (str, regex) => {
  match = str.match(regex);
  return match ? match[0] : null;
}

// @todo handle cases of multiple matches
const getCalories = str => firstMatch(str, 'calories.*' + REGEX_NUMBER);

const getNutrient = str => firstMatch(str, REGEX_NUTRIENT);

const getPercentage = str => firstMatch(str, REGEX_PERCENTAGE);

// @todo handle multiple units, such as in serving size
const getUnit = str => firstMatch(str, REGEX_UNIT);

//const datafs = fs.readFileSync("./cacao_facts.png");
//const datafs = fs.readFileSync("./assets/potato_facts.jpg");

const onTakePicture = async (photo) => {
  console.log('photo.uri');
  console.log(photo.uri);
  const params = {
    Document: {
      Bytes: photo.base64,
    },
    FeatureTypes: ['TABLES']
  };
  const command = new AnalyzeDocumentCommand(params);

  try {
    console.log('try');
    const data = await client.send(command);
    console.log('data');
    console.log(data);
    const amounts = [];
    const percentages = [];
    const units = [];
    const facts = [];
    let fact = {};
  
    data.Blocks.filter(block => block.BlockType === "LINE")
      .map(block => {
        let txt = block.Text.replace('/', ' ');
        txt = fixOhsThatShouldBeZeroes(txt).toLowerCase();
        //console.log('txt: ' + txt);
  
        const amount = getAmount(txt);
        const nutrient = getNutrient(txt);
        let percentage = getPercentage(txt);
        const unit = getUnit(txt);
  
        // @todo need dictionary to prevent duplicates
        if (nutrient !== null) {
          //console.log('nutrient: ' + nutrient);
          if (typeof fact.nutrient !== 'undefined') {
            facts.push(fact);
          }
          fact = { nutrient: nutrient };
        }
  
        if (amount !== null) {
          //console.log('amount: ' + amount);
  
          if (typeof fact.nutrient !== 'undefined' && typeof fact.amount === 'undefined') {
            fact.amount = amount;
  
            if (unit) {
              //console.log('unit: ' + unit);
              fact.unit = unit;
            }
  
            if (!requiresPercentage(fact)) {
              facts.push(fact);
              fact = {};
            }
          } else {
            amounts.push(amount);
  
            if (unit) {
                units.push(unit);
            }
          }
        } else {
          if (amounts.length > 0) {
            fact.amount = amounts.shift();
          }
          // @todo do likewise for unit
        }
  
        // @todo account for skew
        if (percentage !== null) {
          percentage = percentage.replace('%', '');
          //console.log('percentage: ' + percentage);
          if (requiresPercentage(fact)) {
            fact.percentage = percentage;
          } else {
            percentages.push(percentage);
          }
        } else {
          if (requiresPercentage(fact) && percentages.length > 0) {
            fact.percentage = percentages.shift();
          }
        }
      });
  
    //console.log(percentages);
    console.log(facts);
  } catch (err) {
    console.log('catch err');
    console.log(err);
  }
}

export default function FactParser (props) {
  return <PreppyCamera onTakePicture={onTakePicture} />;
}
