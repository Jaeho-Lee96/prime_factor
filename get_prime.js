exports.get_prime = function(input) {

    const number = parseInt(input); // Convert String to Int for calculating

    var loop = parseInt(number**0.5); // Faster Algorithm to find Prime factor
    var i = 1;
    var max_prime = 0;

    while(i <= loop) {
        if(number % i == 0) {
            var number2 = number/i;
            if(is_prime(i)){
                if(i > max_prime) {
                    max_prime = i;
                }
            } if(is_prime(number2)) {
                if(number2 > max_prime) {
                    max_prime = number2;
                }
            }
        }
        i = i + 1;
    }
    return max_prime;
}

function is_prime(temp) {
    if(temp==1) {
        return false;
    }
    var j=2;
    while(j < temp) {
        if(temp % j == 0) {
            return false;
        }
        j+=1
    }
    return true;
}