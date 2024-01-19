
const INPUT_TEL = $("input[type='tel']");
const HT = $("#montantHT");
const TVA = $("#montantTVA");
const TTC = $("#montantTTC");
const TAUX_TVA = $("#tauxTVA");
const TOTAL_TVA = $("#totalTva");
const LIST_BUTTONS = $("input[type='button']");

function cleanValue(rawAmount, symbol) {
    return parseFloat(rawAmount.replace(symbol, "").trim());
}

function formatValue(rawAmount) {
    return rawAmount.toFixed(2) + " €";
}

INPUT_TEL.keyup(function() {

    let id = $(this).attr("id");
    calculTVA(id);

});

LIST_BUTTONS.click(function() {
    TAUX_TVA.val($(this).val());
    calculTVA("montantHT");

});


function calculTVA(id) {

    let ht = cleanValue(HT.val(), "€"), 
    ttc = cleanValue(TTC.val(), "€"), 
    tva = cleanValue(TVA.val(), "€"), 
    tauxTVA = cleanValue(TAUX_TVA.val(), "%") / 100;

    if (id === "montantHT") {

    // montantHT
        // montant TTC
        // montant TVA
    
        tva = ht * tauxTVA;
        ttc = ht + tva;


    }
    else if (id === "montantTVA") {

    // montantTVA
        // montant TTC
        // montant HT
        ht = tva / tauxTVA;
        ttc = ht + tva;
    }
    else if (id === "montantTTC") {

    // montantTTC
        // montant TVA
        // montant HT
        ht = ttc / (1 + tauxTVA);
        tva = ttc - ht;

    } else {

    // tauxTVA
        // montant TVA
        // montant HT
        // montant TTC

    }

    HT.val(formatValue(ht));
    TVA.val(formatValue(tva));
    TTC.val(formatValue(ttc));

    TOTAL_TVA.append("<p>Montant HT = " + formatValue(ht) + "</p>");
    TOTAL_TVA.append("<p>Montant TVA = " + formatValue(tva) + "</p>");
    TOTAL_TVA.append("<p>Montant TTC = " + formatValue(ttc) + "</p>");

}