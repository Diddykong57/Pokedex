window.onload = function () {
    const redirectUrl = window.location.origin + "/docs/oauth2-redirect.html";

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
        clientId: "5e1sv0erm0h9nhhtvin5lh7cci",
        usePkceWithAuthorizationCodeGrant: true,
        scopes: "openid email pokedex-api/write"
    });

    window.ui = ui;
};