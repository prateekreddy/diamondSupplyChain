$(async () => {
    $('#verifier').click(() => {
        const diamondId = $('#verifyDiamondId').val();
        const jewelerId = $('#verifyJewelerId').val();
        const isVerified = $('#isVerified').val();
        const userAddress = $('#verifyUserAddress').val();

        console.log(diamondId, jewelerId, isVerified, userAddress);
        if(diamondId && jewelerId && userAddress) {
            $.get(`/v1/jeweler/verifyDiamond?diamondId=${diamondId}&jewelerId=${jewelerId}&isVerified=${isVerified}&userAddress=${userAddress}`, (data, status) => {
                console.log(data, status);
                if(status == 'success') {
                    $('#verifyMsg').html(`Diamond ${diamondId} is verified as ${isVerified} by jeweler with id ${jewelerId}`);
                } else {
                    $('#verifyMsg').html(`There was an issue creating diamond. Check back later.`);
                }
            })
        }
    });

    $('#diamondSeller').click(() => {
        const diamondId = $('#sellDiamondId').val();
        const jewelerId = $('#sellJewelerId').val();
        const userAddress = $('#sellUserAddress').val();
        console.log(diamondId, jewelerId, userAddress);
        if(diamondId && jewelerId && userAddress) {
            $.get(`/v1/jeweler/sellDiamond?diamondId=${diamondId}&jewelerId=${jewelerId}&userAddress=${userAddress}`, (data, status) => {
                console.log(data, status);
                if(status == 'success') {
                    $('#sellMsg').html(`Diamond ${diamondId} is sold by jeweler with id ${jewelerId}`);
                } else {
                    $('#sellMsg').html(`There was an issue selling diamond. Check back later.`);
                }
            })
        }
    });
});