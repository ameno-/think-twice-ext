/**
 * Created by ameno on 1/4/17.
 */
var ROOT_URL = "https://think-twise.herokuapp.com/";
var selectedText;

chrome.runtime.sendMessage({"action" : "getAnalytics"}, function(selectionText) {
    $.getJSON( ROOT_URL + selectionText, function( data ) {
        console.log(data);
        setSelectedText(selectionText);
        buildDocumentCharts(data.documentAnalysis);
        buildSentenceChart(data.sentenceAnalysis);
    });
});

$(document).ready(function(){
    $('.collapsible').collapsible();
});

function setSelectedText(text){
    $('.analysedText').text(text);
}

function buildSentenceChart(sentences){
    // move to server!!!
    var emoTab = $('#emotionalTab');
    var langTab = $('#languageTab');
    var socTab = $('#socialTab');

    sentences.map(function (sentence) {
        var emoMaxRoot = sentence.tone.emotion_tone.max;
        var langMaxRoot = sentence.tone.language_tone.max;
        var socMaxRoot = sentence.tone.social_tone.max;

        var emoText = $('<p class="sentenceAnalysis flow-text"><p>').addClass(emoMaxRoot.name.toLowerCase()).text(sentence.text);
        var langText = $('<p class="sentenceAnalysis flow-text"><p>').addClass(langMaxRoot.name.toLowerCase()).text(sentence.text);
        var socText = $('<p class="sentenceAnalysis flow-text"><p>').addClass(socMaxRoot.name.toLowerCase()).text(sentence.text);

        emoTab.append(emoText[0]);
        langTab.append(langText[0]);
        socTab.append(socText[0]);

        console.log(emoText, langText, socText);
    });
}

function buildDocumentCharts(analytics){
    var spinners = $('.progress');
    spinners.show();

    var emotionData = {
        labels: analytics.emotion_tone.names,
        datasets: [
            {
                data: analytics.emotion_tone.scores,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#E7E9ED",
                    "#4BC0C0"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#E7E9ED",
                    "#4BC0C0"
                ]
            }]
    };

    var languageData = {
        labels: analytics.language_tone.names,
        datasets: [
            {
                label: "Language analytics",
                backgroundColor: "rgba(179,181,198,0.2)",
                borderColor: "rgba(179,181,198,1)",
                pointBackgroundColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(179,181,198,1)",
                data: analytics.language_tone.scores
            },
        ]
    };

    var socialData = {
        datasets: [{
            data: analytics.social_tone.scores,
            backgroundColor: [
                "#FF6384",
                "#4BC0C0",
                "#FFCE56",
                "#E7E9ED",
                "#36A2EB"
            ],
            label: 'social' // for legend
        }],
        labels: analytics.social_tone.names
    };

    var emotionChartElement = document.getElementById("emotionChart");
    var languageChartElement = document.getElementById("languageChart");
    var socialChartElement = document.getElementById("socialChart");

    var emotionChart = new Chart(emotionChartElement, {
        type: 'doughnut',
        data: emotionData
    });

    var languageChart = new Chart(languageChartElement, {
        type: 'radar',
        data: languageData
    });

    var socialChart = new Chart(socialChartElement, {
        type: 'polarArea',
        data: socialData
    });

    spinners.hide();
}
