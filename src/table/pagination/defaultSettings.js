const defaultSettings = {
    nRows: null, // total number of rows, i.e. the length of the data file
    nRowsPerPage: 10, // number of rows displayed per page
    nPages: null, // total number of pages given number of rows
    nPageLinksDisplayed: 10, // total number of pages given number of rows
    activePage: 0 // current page, 0-indexed
};

defaultSettings.startIndex = defaultSettings.activePage * defaultSettings.nRowsPerPage; // first row shown
defaultSettings.endIndex = defaultSettings.startIndex + defaultSettings.nRowsPerPage; // last row shown

export default defaultSettings;
