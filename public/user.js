$(() => {
    $('#getDiamond').click(() => {
        const diamondId = $('#diamondId').val();
        if(diamondId) {
            $.get(`/v1/user/getDiamond?diamondId=${diamondId}`, (result, status) => {
                console.log(result, status);
                if(status == "success") {
                    const listOfVars = ['oreId', 'diamondId', 'caratWeight', 'color', 'cut', 'shape', 'clarity', 'status', 'location'];
                    let table = "";
                    for(var i=0; i < listOfVars.length; i++) {
                        table += `<tr><td>${listOfVars[i]}</td><td>${result[listOfVars[i]]}</td></tr>`
                    }
                    $('#diamondDetails table').html(table);
                }
            })
        }
    })

    $('#getOre').click(() => {
        const oreId = $('#oreId').val();
        if(oreId) {
            $.get(`/v1/user/getOre?oreId=${oreId}`, (result, status) => {
                console.log(result, status);
                if(status == "success") {
                    $('#oreDetails table').html(`<tr><td>Wastage</td><td>${result.unaccountedWeight}</td></tr>`);
                }
            })
        }
    })
})