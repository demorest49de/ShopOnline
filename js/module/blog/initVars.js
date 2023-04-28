export const initVars = (accum, data) => {

    let accumAsArray = accum ? Object.entries(accum) : undefined;
    const dataAsArray = Object.entries(data);

    return accumAsArray ? [...accumAsArray, ...dataAsArray] :
        [...dataAsArray];
};


// let vars = initVars(null, data);
// const pe = {name: 'vasja'};
// vars = initVars(pe, Object.fromEntries(vars));
// console.log(' : ', vars);