import isDevice from './modules/isDevice';

function main() {

    if(isDevice.sm()){
        console.log('yes');
    }
}

main();