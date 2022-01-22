import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_PATH = path.join(__dirname, '..');
const CONFIG_PATH = path.join(__dirname, 'config.json');
const TAB = '    ';

async function importFileContent(filePath) {
    return (await import(filePath)).default;
}

function clearContent(object) {
    return Object.keys(object).reduce((acc, field) => {
        acc[field] = typeof object[field] === 'object' ? clearContent(object[field]) : '';
        return acc;
    }, {});
}

function addMissingFields(acc, source) {
    let hasMissingField = false;

    Object.keys(source).forEach((field) => {
        const value = source[field];
        const isObject = typeof value === 'object';
        // field is missing
        if (acc[field] === undefined) {
            hasMissingField = true;
            console.log(`Missing field "${field}" was added`);
            acc[field] = isObject ? clearContent(value) : '';
        } else
        // field exists, check its type
        if (isObject) {
            hasMissingField = addMissingFields(acc[field], value);
        }
    });

    return hasMissingField;
}

function formatObjectContent(object, level) {
    const tabs = [...Array(level)].map(() => TAB).join('');

    const fields = Object.keys(object).map((field) => {
        let value = object[field];
        value = typeof value === 'object' ? `{\n${
            formatObjectContent(value, level + 1)
        }${tabs}}` : `'${value}'`;
        return `${tabs}${field}: ${value},\n`;
    });
    return fields.join('');
}

function formatContent(object) {
    return `export default {\n${
        formatObjectContent(object, 1)
    }};\n`;
}

async function createLocales() {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));

    const mainFolderName = config.mainLanguageTemplateFolder;
    const folderNames = fs.readdirSync(ROOT_PATH, { withFileTypes: true, encoding: 'utf-8' })
        .filter(d => d.isDirectory() && d.name !== mainFolderName && config.excludeFolders.indexOf(d.name) === -1)
        .map(d => d.name);

    const mainFolderPath = path.join(ROOT_PATH, mainFolderName);
    console.log(`Checking main language directory "${mainFolderName}":`);
    const mainFolderFiles = fs.readdirSync(mainFolderPath, 'utf-8');

    const locales = {};

    for (let i = 0; i < folderNames.length; i += 1) {
        const folderName = folderNames[i];

        console.log(`Checking language directory "${folderName}":`);
        const folderContent = {};
        const folderPath = path.join(ROOT_PATH, folderName);
        const files = fs.readdirSync(folderPath, 'utf-8');

        // remove file if it doesn't exist in main folder
        files.forEach((fileName) => {
            if (!mainFolderFiles.includes(fileName)) {
                console.log(`Removing ${path.join(folderName, fileName)}...`);
                fs.unlinkSync(path.join(folderPath, fileName));
            }
        });

        for (let j = 0; j < mainFolderFiles.length; j += 1) {
            const mainFileName = mainFolderFiles[j];
            const filePath = path.join(folderPath, mainFileName);
            let fileContent;

            console.log(`Importing ${path.join(mainFolderName, mainFileName)} for compare...`);
            const mainFileContent = await importFileContent(path.join(mainFolderPath, mainFileName));

            // add file if it exist in main folder
            if (!files.includes(mainFileName)) {
                console.log(`Creating ${path.join(folderName, mainFileName)}...`);
                fileContent = clearContent(mainFileContent);
                fs.writeFileSync(filePath, formatContent(fileContent), 'utf-8');
            } else {
                // check for missing fields
                console.log(`Importing ${path.join(folderName, mainFileName)}...`);
                fileContent = await importFileContent(filePath);
                const hasMissingFields = addMissingFields(fileContent, mainFileContent);
                if (hasMissingFields) {
                    console.log(`Adding fields to ${path.join(folderName, mainFileName)}...`);
                    fs.writeFileSync(filePath, formatContent(fileContent), 'utf-8');
                }
            }
            folderContent[mainFileName.replace('.js', '')] = fileContent;
        }

        locales[folderName] = folderContent;
    }

    fs.writeFileSync(path.join(ROOT_PATH, config.resultBundleFile), JSON.stringify(locales), { encoding: 'utf-8' });

    let constantsContent = `export const LANGUAGES = ['${folderNames.join('\', \'')}'];\n`;
    constantsContent += `export const MAIN_LANGUAGE = '${config.mainLanguageTemplateFolder}';\n`;
    fs.writeFileSync(path.join(ROOT_PATH, config.languageConstantsFile), constantsContent, { encoding: 'utf-8' });
}

createLocales();
