
  const getSelectedValues = (element) => {
    let options = element.selectedOptions
    options = Array.from(options)
    let selectedValues = []
    options.map(o=>{
      selectedValues.push(parseInt(o.value))
      return true
   })
   return selectedValues
  }

  export default getSelectedValues