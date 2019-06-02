'use strict'

// 참고
// https://stackoverflow.com/questions/3103962/converting-html-string-into-dom-elements/3104237
// https://stackoverflow.com/questions/38335920/why-is-domparser-not-preserving-inline-styles-of-parsed-dom


let domMaker = {

}

domMaker.fromString = function(xmlString){

    let htmlelement = new DOMParser().parseFromString(xmlString, 'text/xml').firstChild;

    return htmlelement;
}

domMaker.fromTag = function(tagName){

    let xmlString = `<${tagName} xmlsns=\"http://www.w3.org/1999/xhtml\"></${tagName}>`;
    let htmlelement = new DOMParser().parseFromString(xmlString, 'text/xml').firstChild;

    return htmlelement;
}

domMaker.fromTagId = function(tagName, idName){
    
    let xmlString = `<${tagName} xmlsns=\"http://www.w3.org/1999/xhtml\" id=\'${idName}\'></${tagName}>`;
    let htmlelement = new DOMParser().parseFromString(xmlString, 'text/xml').firstChild;

    return htmlelement;
}

domMaker.fromTagIdClass = function(tagName, idName, className){

    let xmlString = `<${tagName} xmlsns=\"http://www.w3.org/1999/xhtml\" id=\'${idName}\'></${tagName}>`;
    let htmlelement = new DOMParser().parseFromString(xmlString, 'text/xml').firstChild;

    return htmlelement;
}