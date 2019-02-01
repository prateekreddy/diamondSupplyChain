$(async () => {
    $('#certifier').click(() => {
        const diamondId = $('#diamondId').val();
        const certifierId = $('#certifierId').val();
        const isCertified = $('#isCertified').val();
        const userAddress = $('#userAddress').val();
        console.log(diamondId, certifierId, isCertified, userAddress);
        if(diamondId && certifierId && userAddress) {
            $.get(`/v1/certifier/certify?diamondId=${diamondId}&certifierId=${certifierId}&isCertified=${isCertified}&userAddress=${userAddress}`, (data, status) => {
                console.log(data, status);
                if(status == 'success') {
                    $('#certifyMsg').html(`Diamond ${diamondId} is certified ${isCertified} by certifier with id ${certifierId}`);
                } else {
                    $('#certifyMsg').html(`There was an issue creating diamond. Check back later.`);
                }
            })
        }
    });
});