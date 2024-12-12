

let number = 0;

const startEntering = () => {
    const a = document.getElementById("numberOfobjects").value;
    number = Number(a);

    if (isNaN(number) || !Number.isInteger(number) || a < 1 || a > 5) {
        alert("Введіть ціле число від 1 до 5, будь ласка!");
        return;
    }

    const parent = document.getElementsByClassName('container-2')[0];
    parent.replaceChildren();

    for(let i = 0; i < number; i++) {
        const label = document.createElement('label');
        label.htmlFor = `objectTitle${i}`;
        label.innerHTML = `title ${i+1}`;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `objectTitle${i}`;
        input.placeholder = 'Enter your title here';

        const label2 = document.createElement('label');
        label2.htmlFor = `objectDesc${i}`;
        label2.innerHTML = 'description';

        const input2 = document.createElement('input');
        input2.type = 'text';
        input2.id = `objectDesc${i}`;
        input2.placeholder = 'Enter your description here';
        input2.style.marginBottom = '2vh';

        parent.style.justifyContent = 'flex-start';
        parent.style.paddingTop = '1vh';

        parent.appendChild(label);
        parent.appendChild(input);
        parent.appendChild(label2);
        parent.appendChild(input2);
    }

    const button = document.createElement('button');
    button.innerText = 'Send to server'
    button.onclick = () => {sendToServer()}
    parent.appendChild(button);
}

const sendToServer = () => {
    let obj = [];

    for(let i = 0; i < number; i++) {
        const title = document.getElementById(`objectTitle${i}`).value;
        const b = document.getElementById(`objectDesc${i}`).value;

        if(title.length === 0 || b.length === 0) {
            alert("Потрібно ввести усі значення, бо саме ви вирішили вибрати таку кількість об'єктів");
            return;
        }

        obj.push({title: title, description: b});
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    };

    fetch('https://lab6back.railway.internal/create', options)
        .then(res => {

            if(!res.ok) {
                throw new Error("Bad request");
            }
        })

    setTimeout(() => {window.location.reload()}, 100)

}

const get = () => {

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch('https://lab6back.railway.internal/get', options)
        .then(res => {
            if(!res.ok) {
                throw new Error("Bad request");
            }

            return res.json();
        })
        .then(data => {
            if(data.length === 0) {
                alert("Знайдено записів: 0")
                return;
            }
            viewResult(data)
        })
}

const viewResult = (data) => {
    const container = document.getElementsByClassName('container-2')[0];
    container.replaceChildren();

    for (let i = 0; i < data.length; i++) {
        const toastDiv = document.createElement('div');
        toastDiv.innerHTML = data[i];
        container.appendChild(toastDiv);

        setTimeout(() => {
            toastDiv.querySelector('.toast').classList.add('show');
        }, 100);

        container.style.justifyContent = 'flex-start';
    }

    const button = document.createElement('button');
    button.innerText = 'Go back';
    button.onclick = () => {window.location.reload()};
    container.appendChild(button);
};

const deleteCurrent = (id) => {

    console.log(id);
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(`https://lab6back.railway.internal/delete/${id}`, options)
        .then(res => {
            if(!res.ok) {
                throw new Error("Bad request");
            }

        })

    setTimeout(() => {window.location.reload()}, 100)
}
