import Container from "../../common/Container"

const PrivacyPolicyInfo = () => {
  return (
    <div>
         <Container className="section-gap">
        <h2 className="mb-10 text-primary">
          Privacy Policy
        </h2>

        <div className="space-y-6 text-base leading-7">
          <p>
            At <strong>Putech Business & IT Solutions</strong>, your privacy is of utmost importance to us.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you visit our website or use our services.
          </p>

          <h3 className="text-2xl font-semibold text-primary mt-8">1. Information We Collect</h3>
          <p>
            We may collect personal information such as your name, email address, phone number, and other
            contact details when you fill out forms or interact with our services.
          </p>

          <h3 className="text-2xl font-semibold text-primary mt-8">2. How We Use Your Information</h3>
          <p>
            The information we collect is used to:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Provide and manage our services</li>
            <li>Improve our website and customer experience</li>
            <li>Send administrative information or promotional emails (you can opt out anytime)</li>
            <li>Respond to inquiries and offer support</li>
          </ul>

          <h3 className="text-2xl font-semibold text-primary mt-8">3. Sharing Your Information</h3>
          <p>
            We do not sell, rent, or trade your personal information. However, we may share it with trusted
            third parties who assist us in operating our website and delivering our services — under strict confidentiality agreements.
          </p>

          <h3 className="text-2xl font-semibold text-primary mt-8">4. Cookies and Tracking</h3>
          <p>
            We use cookies and similar technologies to enhance your browsing experience. You can control
            cookies through your browser settings.
          </p>

          <h3 className="text-2xl font-semibold text-primary mt-8">5. Data Security</h3>
          <p>
            We implement industry-standard security measures to protect your personal data from unauthorized
            access, disclosure, or destruction.
          </p>

          <h3 className="text-2xl font-semibold text-primary mt-8">6. Your Rights</h3>
          <p>
            You have the right to access, correct, or delete your personal information. You may also request
            to opt out of marketing communications at any time.
          </p>

          <h3 className="text-2xl font-semibold text-primary mt-8">7. Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy periodically. Any changes will be posted on this page with a
            revised date.
          </p>

          <h3 className="text-2xl font-semibold text-primary mt-8">8. Contact Us</h3>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
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

export default PrivacyPolicyInfo