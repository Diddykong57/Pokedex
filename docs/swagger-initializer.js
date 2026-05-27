window.onload = function () {
    const redirectUrl = `${window.location.origin}${window.location.pathname.replace(/\/$/, "")}/oauth2-redirect.html`;

    const ui = SwaggerUIBundle({
        url: "./openapi.yaml",
        dom_id: "#swagger-ui",
        deepLinking: true,
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
        ],
        layout: "StandaloneLayout",
        oauth2RedirectUrl: redirectUrl
    });

    ui.initOAuth({
        clientId: window.POKEDEX_SWAGGER_CONFIG.cognitoClientId,
        usePkceWithAuthorizationCodeGrant: true,
        scopes: ["openid", "email"]
    });

    window.ui = ui;
};