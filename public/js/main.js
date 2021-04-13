
function lockRemoveButton()
{
    const removeButton = document.getElementById('remove-button');
    if (!removeButton)
    {
        return;
    }
    removeButton.setAttribute('disabled', 'true');
}

function addNewRecord()
{
    const surname = document.getElementsByName('surname')[0].value;
    const number = document.getElementsByName('number')[0].value;

    if (!surname || !number)
    {
        return;
    }

    fetch('/add',
{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({surname, number})
    }).then(response => response.json())
        .then(() => window.location.href = '/');
}

function updateRecord()
{
    const id = document.getElementsByClassName('form-part edit')[0].getAttribute('data-key');
    const surname = document.getElementsByName('surname')[0].value;
    const number = document.getElementsByName('number')[0].value;

    if (!surname || !number)
    {
        return;
    }

    fetch('/update',
{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id, surname, number})
    }).then(response => response.json())
        .then(() => window.location.href = '/');
}

function deleteRecord()
{
    const id = document.getElementsByClassName('form-part edit')[0].getAttribute('data-key');
    if (!id)
    {
        return;
    }

    fetch('/delete',
{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id})
    }).then(response => response.json())
        .then(() => window.location.href = '/');
}
