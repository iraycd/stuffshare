const prepare = (text, wildecard) => {

    if (text.length < 2) {
        return '';
    }
    let wildecardChar = wildecard == 1 ? '*' : '';

    let freetext = text.trim();
    let cleaned = freetext.replace(/[^a-zA-Z0-9À-ž_-\s]/g, " ").split(' ').filter(item => { return item }).join(' ');
    let size = cleaned.split(' ').length;

    let form = null;
    let equal = null;
    let equal_wildecard = null;
    let near = null;
    if (size > 1) {
        //form single word
        form = cleaned.split(' ').map(item => {
            if (item.length > 2) {
                return `FORMSOF(INFLECTIONAL,"${item}") weight(0.1) `;
            }
            else null
        }).join(',')
        near = `NEAR(${cleaned.split(' ').filter(item => { return item.length > 2 }).join(',')}) weight(0.6)`
    }
    //form

    let form_whole = `FORMSOF(INFLECTIONAL,"${cleaned}") weight(0.6) `
    let wildecards
    if (size == 1) {
        equal = `${cleaned} weight(0.8)`;
        if (wildecard) {
            equal_wildecard = `${cleaned}* weight(0.6)`
        }
    }

    let query = [equal,
        equal_wildecard,
        form_whole,
        form,
        near
    ].filter(item => {
        return item;
    }).join(',');

    return `ISABOUT(${query})`;
}


const prepareSmall = (text) => {
    if (text.length < 2) {
        return '';
    }

    let freetext = text.trim();
    let cleaned = freetext.replace(/[^a-zA-Z0-9À-ž_-\s]/g, " ").split(' ').filter(item => { return item }).join(' ');
    let size = cleaned.split(' ').length;

    let form_whole = `FORMSOF(INFLECTIONAL,"${cleaned}") weight(0.3) `
    let equal = `"${cleaned}" weight(1)`;
    let withStar = `"${cleaned}*" weight(0.5)`;
    let withWild = `"${cleaned.split(' ').map(item => {
        return item + "*"
    }).join(' ')}" weight(0.2)`
    let query = [equal,
        form_whole,
        withStar,
        withWild,
    ].filter(item => {
        return item;
    }).join(',');
    return `ISABOUT(${query})`;

}
const clean = (text) => {
    let freetext = text.trim();
    let cleaned = freetext.replace(/[^a-zA-Z0-9À-ž_-\s]/g, " ").split(' ').filter(item => { return item }).join(' ');
    return cleaned
}

const simplePrepare = (text) => {
    let freetext = clean(text);
    return `"${freetext}*"`
}
const PrepareSearch = {
    prepare,
    clean,
    simplePrepare,
    prepareSmall

}



export default PrepareSearch