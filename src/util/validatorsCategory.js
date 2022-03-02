module.exports.validatedCategory = (category) => {
    const errors = {};

    if (category.trim() === "") {
        errors.category = "Ingrese una categoria";
    };

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};