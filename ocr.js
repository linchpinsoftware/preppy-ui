const fs = require('fs');
//require("react-native-get-random-values");
//require("react-native-url-polyfill/auto");
const { TextractClient, AnalyzeDocumentCommand } = require("@aws-sdk/client-textract");

const datafs = fs.readFileSync("./assets/cacao_facts.png");
//const datafs = fs.readFileSync("./assets/potato_facts.jpg");

const client = new TextractClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'AKIASV7CDFJONFKYMMEE',
    secretAccessKey: '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',
  }
});

const params = {
  Document: {
    Bytes: Buffer.from(datafs),
  },
  FeatureTypes: ['TABLES']
};
const command = new AnalyzeDocumentCommand(params);

const run = async () => {
  try {
    const data = await client.send(command);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

run();