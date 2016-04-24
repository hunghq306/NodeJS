
function generateTable() {
    var arrStr = [];
    var arrNum = [];
    for (var i=0; i<10; i++) {
        arrStr[i] = getRandomString();
        arrNum[i] = Math.random();
    }
    var table = document.createElement('table');
    var total = 0;
    for (var i=0; i<10; i++) {
        var row = table.insertRow(i);

        var col1 = row.insertCell(0);
        col1.innerHTML = arrStr[i];

        var col2 = row.insertCell(1);
        col2.innerHTML = arrNum[i];

        total += arrNum[i];
    }

    // last row
    var row = table.insertRow(10);
    var col1 = row.insertCell(0);
    col1.innerHTML = 'Totals = ' + total;

    var col2 = row.insertCell(1);
    var avg = total/10;
    col2.innerHTML = 'AVERAGE = ' + avg;
}

function getRandomString() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var stringLength = Math.floor((Math.random() * 10) + 1); // random number between 1 and 10:
    var randomString = '';
    for (var i=0; i<stringLength; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomString += chars.substring(rnum,rnum+1);
    }
    return randomString;
}
