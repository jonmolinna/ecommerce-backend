module.exports.validateRegisterProduct = (codigo, marca, descr, precio, material, color, urlImage, genero, detalles, categoryId) => {
    const errors = {};

    if (codigo.trim() === "") {
        errors.codigo = "Ingrese un código.";
    }

    if (marca.trim() === "") {
        errors.marca = "Ingrese una marca del producto.";
    }

    if (descr.trim() === "") {
        errors.descr = "Ingrese una drescripción.";
    }

    // if (precio.trim() === "") {
    //     errors.precio = "Ingrese un precio.";
    // }

    if (material.trim() === "") {
        errors.material = "Ingrese material.";
    }

    if (color.trim() === "") {
        errors.color = "Ingrese un color.";
    }

    if (urlImage.trim() === "") {
        errors.urlImage = "Ingrese un URL del imagen."
    }

    if (genero.trim() === "") {
        errors.genero = "Ingrese un género.";
    }

    if (categoryId.trim() === "") {
        errors.categoryId = "Ingrese la categoria del producto";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}