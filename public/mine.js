$(async () => {
    // set a random id when trying to fill
    $('#foundOre').click(() => {
        if(!$('#oreId').val()) {
            $.get('/v1/util/getUniqueId', (data, status) => {
                if(status = "success") {
                    $('#oreId').val(data.id);
                }
            });
        }
    });

    $('#oreFounder').click(() => {
        console.log("Newly found ore is being added")
        const id = $('#oreId').val();
        const mineId = $('#mineId').val();
        const clarity = $('#clarity').val();
        const caratWeight = $('#caratWeight').val();
        const userAddress = $('#userAddress').val();
        if(id && mineId && clarity && caratWeight && userAddress) {
            $.post('/v1/mine/foundOre', {
                id,
                mineId,
                clarity,
                caratWeight,
                userAddress
            }, (data, status) => {
                console.log(data, status);
                if(status == 'success') {
                    $('#foundOreMsg').html(`Newly found ore with id ${id} successfully added`);
                } else {
                    $('#foundOreMsg').html(`There was an issue creating mine. Check back later.`);
                }
            })
        }
    });

    $('#oreProcesser').click(() => {
        console.log("Ore being sent for processing")
        const oreId = $('#processOreId').val();
        const mineId = $('#processMineId').val();
        const pcId = $('#pcId').val();
        const userAddress = $('#processUserAddress').val();
        console.log(oreId, mineId, pcId, userAddress)
        if(oreId && mineId && pcId && userAddress) {
            $.get(`/v1/mine/processOre?oreId=${oreId}&pcId=${pcId}&mineId=${mineId}&userAddress=${userAddress}`, (data, status) => {
                console.log(data, status);
                if(status == 'success') {
                    $('#processOreMsg').html(`Ore ${oreId} sent for processing at processing center ${pcId}`);
                } else {
                    $('#processOreMsg').html(`There was an issue creating mine. Check back later.`);
                }
            })
        }
    });
});