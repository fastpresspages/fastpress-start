# Security policy

## Scope

This is a static HTML/CSS/JavaScript template. There is no server, database or authentication in this repository.

In scope:

- Cross-site scripting in the page or form handling.
- A form endpoint or configuration that leaks data.
- A dependency or workflow that runs untrusted code.
- A link or asset that points somewhere unexpected.

Out of scope:

- The security of a site you build by forking this template.
- FormSubmit, GitHub Pages or your own hosting provider.
- Reports that require access to a private account or a paid service.

## Reporting

Please do not open a public issue for a security problem.

- Use GitHub's private vulnerability reporting: https://github.com/fastpresspages/fastpress-start/security/advisories/new
- Or email **meetcode99@gmail.com** with “FastPress Start security” in the subject.

Include the page, the steps to reproduce, and the impact. I will acknowledge within a few days and credit you if you want.

## Safe use

- Never put a secret API key in `config.js` or any client-side file.
- Replace the demo form endpoint before publishing.
- Keep the privacy page accurate for the processor you use.
- If you add a third-party script, review what it collects and update the privacy page.
