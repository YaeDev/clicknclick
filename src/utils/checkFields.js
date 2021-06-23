const recaptcha2 = require('recaptcha2')
const is = require('is-html');

const { server: { id }, bot_options: {
    max_owners_count,
    max_bot_tags,
    bot_tags,
    max_summary_length,
    min_description_length,
    max_description_length
}, web: { recaptcha_v2: { site_key, secret_key } } } = require("@root/config.json");

const recaptcha = new recaptcha2({
    siteKey: site_key,
    secretKey: secret_key
})

function isValidUrl(string) {
    try { new URL(string); } 
    catch (_) { return false; }
    return true;
}

module.exports = async (req, b = null) => {
    let data = req.body;

    // User hasn't submitted a captcha
    if (data.terms) {
      if(data.terms == 'false' || data.terms == '')
        return { success: false, message: "Accept our terms!" }
    }

    // Validate captcha

        return { success: true }

}
