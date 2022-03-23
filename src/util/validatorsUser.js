module.exports.validateRegisterUser = (nombre, apellido, email, password, confirmPassword) => {
    const errors = {};

    if (nombre.trim() === "") {
        errors.nombre = "Ingrese un nombre";
    }
    else if (nombre.length <= 2) {
        errors.nombre = "Campo nombre debe tener mas de 2 caracteres";
    }
    else {
        const nombreRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        if (!nombre.match(nombreRegex)) {
            errors.nombre = 'Ingrese un nombre válido';
        }
    };

    if (apellido.trim() === "") {
        errors.apellido = "Ingrese un apellido";
    }
    else if (apellido.length <= 2) {
        errors.apellido = "Campo apellido debe tener mas de 2 caracteres";
    }
    else {
        const apellidoRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        if (!apellido.match(apellidoRegex)) {
            errors.apellido = "Ingrese los apellidos validos";
        }
    };

    if (email.trim() === "") {
        errors.email = "Ingrese un correo electrónico";
    }
    else {
        const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(emailRegex)) {
            errors.email = "Ingrese un correo electrónico válida";
        }
    };

    if (password === ""){
        errors.password = "Ingrese una contraseña";
    }
    else if (password !== confirmPassword) {
        errors.password = "Las contraseñas deben coincidir";
    };

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};

module.exports.validateLoginUser = (email, password) => {
    const errors = {};

    if (email.trim() === "") {
        errors.email = "Ingrese un email";
    };

    if (password.trim() === "") {
        errors.password = "Ingrese una contraseña";
    };

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};

module.exports.validateUpdatedUser = (nombre, apellido, dni, telefono, fech_nacimiento, genero ) => {
    const errors = {};

    if (nombre.trim() === "") {
        errors.nombre = "Ingrese un nombre";
    }
    else if (nombre.length <= 2) {
        errors.nombre = "Campo nombre debe tener mas de 2 caracteres";
    }
    else {
        const nombreRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        if (!nombre.match(nombreRegex)) {
            errors.nombre = 'Ingrese un nombre válido';
        }
    };

    if (apellido.trim() === "") {
        errors.apellido = "Ingrese un apellido";
    }
    else if (apellido.length <= 2) {
        errors.apellido = "Campo apellido debe tener mas de 2 caracteres";
    }
    else {
        const apellidoRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        if (!apellido.match(apellidoRegex)) {
            errors.apellido = "Campo apellido solo acepta letras y espacios";
        }
    };

    if (dni) {
        const dniRegex = /^[\d]{8}$/;
        if (!dni.match(dniRegex)) {
            errors.dni = "Ingrese un DNI válido";
        }
    }

    if (telefono) {
        const phoneReges = /^9[\d]{8}$/;
        if (!telefono.match(phoneReges)) {
            errors.telefono = "Ingrese un numero de celular válido";
        }
    }

    if (genero) {
        const generoRegex = /^[MFmf]{1}$/;
        if (!genero.match(generoRegex)) {
            errors.genero = "Genero solo acepta M o F";
        }
    }

    if (fech_nacimiento) {
        let fecha = new Date(fech_nacimiento).getFullYear();
        let ahora = new Date().getFullYear();
        let edad = ahora - fecha;
        if (edad <= 17) {
            errors.fech_nacimiento = 'Ingrese una fecha mayor a 17 años';
        }
        else if (edad >= 120) {
            errors.fech_nacimiento = 'Ingrese una fecha válida';
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};