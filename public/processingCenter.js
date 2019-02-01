$(async () => {
    $('#diamondCreator').click(() => {
        const oreId = $('#oreId').val();
        const pcId = $('#pcId').val();
        const clarity = $('#clarity').val();
        const caratWeight = $('#caratWeight').val();
        const color = $('#color').val();
        const cut = $('#cut').val();
        const shape = $('#shape').val();
        const userAddress = $('#userAddress').val();
        console.log(oreId, pcId, clarity, caratWeight, color, cut, shape, userAddress);
        if(oreId && pcId && clarity && caratWeight && color && cut && shape && userAddress) {
            $.post('/v1/pc/addDiamond', {oreId, pcId, clarity, caratWeight, color, cut, shape, userAddress}, (data, status) => {
                console.log(data, status);
                if(status == 'success') {
                    $('#newDiamondMsg').html(`Diamond from ore ${oreId} is created at processing center ${pcId}`);
                } else {
                    $('#newDiamondMsg').html(`There was an issue creating diamond. Check back later.`);
                }
            });
        }
    });

    $('#oreProcesser').click(() => {
        const oreId = $('#processedOreId').val();
        const pcId = $('#processedPcId').val();
        const userAddress = $('#processedUserAddress').val();
        console.log(oreId, pcId, userAddress);
        if(oreId && pcId && userAddress) {
            $.get(`/v1/pc/oreProcessed?oreId=${oreId}&pcId=${pcId}&userAddress=${userAddress}`, (data, status) => {
                console.log(data, status);
                if(status == 'success') {
                    $('#processedOreMsg').html(`Ore ${oreId} is processed at processing center ${pcId}`);
                } else {
                    $('#processedOreMsg').html(`There was an issue. Check back later.`);
                }
            });
        }
    });

    $('#jewelerSender').click(() => {
        const diamondId = $('#jewelerDiamondId').val();
        const jewelerId = $('#jewelerId').val();
        const pcId = $('#jewelerPcId').val();
        const userAddress = $('#toJewelerUserAddress').val();
        console.log(diamondId, jewelerId, userAddress, pcId);
        if(diamondId && jewelerId && pcId && userAddress) {
            $.get(`/v1/pc/sendToJeweler?diamondId=${diamondId}&jewelerId=${jewelerId}&pcId=${pcId}&userAddress=${userAddress}`, (data, status) => {
                console.log(data, status);
                if(status == 'success') {
                    $('#toJewelerMsg').html(`Diamond ${diamondId} is sent to jeweler ${jewelerId}`);
                } else {
                    $('#toJewelerMsg').html(`There was an issue. Check back later.`);
                }
            })
        }

    })
});