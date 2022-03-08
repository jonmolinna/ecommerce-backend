module.exports.validatedTalla = (talla) => {
    const errors = {};

    if (talla.trim() === "") {
        errors.talla = "Ingrese una talla";
    };

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};