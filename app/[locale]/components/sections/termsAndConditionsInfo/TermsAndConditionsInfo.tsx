import Container from "../../common/Container"

const TermsAndConditionsInfo = () => {
  return (
    <div>
         <Container className="section-gap">
          <h2 className="mb-10">
            Terms & Conditions
          </h2>

          <div className="space-y-6 text-base leading-7">
            <p>
              Welcome to <strong>Putech Business & IT Solutions</strong>. These Terms & Conditions
              govern your use of our website and services. By using our website,
              you agree to comply with and be bound by the following terms.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8">1. Acceptance of Terms</h2>
            <p>
              By accessing or using our website, you confirm that you are in agreement with and
              bound by the terms outlined below. If you do not accept these terms, please do not
              use our services.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8">2. Changes to the Terms</h2>
            <p>
              We reserve the right to update these terms at any time. Continued use of the website
              after changes are made implies acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8">3. Intellectual Property</h2>
            <p>
              All content, branding, logos, and assets on this site are owned by Putech or licensed
              to us. Unauthorized use or duplication is strictly prohibited.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8">4. User Responsibilities</h2>
            <p>
              Users agree not to misuse the website or disrupt its services. Violations may result in
              termination of access or legal action.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8">5. Limitation of Liability</h2>
            <p>
              We do not accept liability for any direct or indirect loss or damage that may arise from
              use of our website or services.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8">6. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a
                href="mailto:hasibulhasan40420@gmail.com"
                className="text-primary underline hover:text-secondary transition"
              >
               hasibulhasan40420@gmail.com
              </a>.
            </p>
          </div>
        </Container>
    </div>
  )
}

export default TermsAndConditionsInfo