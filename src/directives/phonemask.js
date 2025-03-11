function replaceNumberForInput(value) {
    let noSymVal = value.replace(/\D/g, '')
    let x = noSymVal.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)    
    
    if(x[1] != '+7' && x[1] != '7') x[2] = x[1]
    x[1] = "+7"
    let val = !x[3] ? x[1] + ' (' + x[2] : x[1] + ' (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '')
    
    return val
}


const phonemask = {
  	beforeMount: (el, binding) => {
        el.value = binding.value;
	    el.addEventListener("input", (val) => {
        	el.value = replaceNumberForInput(el.value)
	    });
	},
}

export default phonemask;