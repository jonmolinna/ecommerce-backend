module.exports.validateAddReview = (title, comment) => {
    const errors = {};

    if (title.trim() === "") {
        errors.title = "Ingrese un título";
    }
    else {
        const titleRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        if (!title.match(titleRegex)) {
            errors.title = 'Ingrese un título válido';
        }
    };

    if (comment.trim() === "") {
        errors.comment = "Ingrese un comentario";
    };

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    }
}