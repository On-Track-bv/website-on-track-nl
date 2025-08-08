# 🔒 Security Policy

## Supported Versions

We actively maintain security for the following versions of the On-Track website:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | ✅ Fully supported |
| < 1.0   | ❌ No longer supported |

## 🛡️ Security Features

### Current Security Measures

- **🤖 Crawler Protection**: Multi-level bot detection and blocking
- **🔍 SEO Security**: Controlled search engine indexing via robots.txt
- **🚫 Privacy-First**: No tracking cookies, minimal data collection
- **🔐 Secure Forms**: Input validation and sanitization
- **⚡ Content Security**: TypeScript type safety and validation
- **🌐 Transport Security**: HTTPS enforcement via GitHub Pages

### Infrastructure Security

- **GitHub Pages**: Secure static hosting with DDoS protection
- **GitHub Actions**: Automated security scans and dependency updates
- **Domain Security**: Custom domain with HTTPS redirect
- **Build Security**: Verified dependencies and secure build process

## 🚨 Reporting a Vulnerability

We take security seriously at **On-Track B.V.** If you discover a security vulnerability, please follow these steps:

### 📧 Contact Information

**Primary Contact**: security@on-track.nl
**Secondary Contact**: info@on-track.nl
**Phone**: +31 (0)20 123 4567

### 📝 What to Include

When reporting a vulnerability, please provide:

1. **Description**: Clear description of the vulnerability
2. **Steps to Reproduce**: Detailed steps to reproduce the issue
3. **Impact Assessment**: Potential impact and affected systems
4. **Proof of Concept**: Screenshots, logs, or demonstration (if safe)
5. **Suggested Fix**: Your recommendations for resolution (optional)

### 📋 Report Template

```
Subject: [SECURITY] Vulnerability Report - [Brief Description]

Vulnerability Details:
- Type: [e.g., XSS, CSRF, Information Disclosure]
- Severity: [Critical/High/Medium/Low]
- Location: [URL, file, or component affected]

Description:
[Detailed description of the vulnerability]

Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Expected Behavior:
[What should happen]

Actual Behavior:
[What actually happens]

Impact:
[Potential security implications]

Proof of Concept:
[Screenshots, code snippets, or logs]

Suggested Remediation:
[Your recommendations for fixing the issue]

Contact Information:
- Name: [Your name]
- Email: [Your email]
- Company: [Your organization, if applicable]
```

## ⏱️ Response Timeline

### Our Commitment

| Timeline | Action |
|----------|--------|
| **24 hours** | Initial acknowledgment of your report |
| **72 hours** | Preliminary assessment and severity classification |
| **7 days** | Detailed investigation and initial response |
| **30 days** | Resolution or detailed timeline for complex issues |

### Severity Classifications

#### 🚨 Critical (24-48 hours)
- Remote code execution
- SQL injection
- Authentication bypass
- Data breach potential

#### ⚠️ High (2-7 days)
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- Privilege escalation
- Sensitive data exposure

#### 📢 Medium (1-2 weeks)
- Information disclosure
- Denial of service
- Session management issues
- Input validation problems

#### 📝 Low (2-4 weeks)
- Security misconfigurations
- Missing security headers
- Non-sensitive information leakage
- Best practice violations

## 🔄 Security Response Process

### 1. Initial Response
- Acknowledge receipt within 24 hours
- Assign internal tracking number
- Initial severity assessment

### 2. Investigation
- Technical team reviews the report
- Reproduce the vulnerability
- Assess impact and risk

### 3. Validation
- Confirm the vulnerability exists
- Determine affected versions
- Plan remediation strategy

### 4. Remediation
- Develop and test fixes
- Deploy patches to affected systems
- Verify fix effectiveness

### 5. Disclosure
- Coordinate disclosure timeline
- Prepare security advisory
- Credit the reporter (if desired)

## 🏆 Responsible Disclosure

### What We Expect

- **🤝 Good Faith**: Report vulnerabilities to help improve security
- **⏰ Reasonable Time**: Allow time for investigation and remediation
- **🔒 Confidentiality**: Keep vulnerability details confidential until resolved
- **📋 Compliance**: Follow all applicable laws and regulations

### What You Can Expect

- **📧 Acknowledgment**: Prompt response to your report
- **🔄 Updates**: Regular status updates during investigation
- **🏅 Recognition**: Public credit for responsible disclosure (if desired)
- **🛡️ Protection**: We will not pursue legal action for good faith security research

## 🚫 Out of Scope

The following are **NOT** considered security vulnerabilities:

### ❌ Excluded Issues
- **Rate limiting**: Missing or weak rate limiting on non-critical endpoints
- **Email security**: SPF/DKIM/DMARC configuration issues
- **Social engineering**: Attacks requiring user interaction
- **Physical security**: Issues requiring physical access
- **DoS attacks**: That require excessive resources
- **Third-party services**: Vulnerabilities in external services we use
- **Browser-specific**: Issues only affecting outdated browsers

### ❌ Testing Restrictions

**DO NOT**:
- Access, modify, or delete data that doesn't belong to you
- Disrupt our services or infrastructure
- Access other users' accounts or data
- Perform social engineering attacks on our staff
- Test on production systems without permission
- Use automated scanners without prior approval

## 🔧 Security Best Practices

### For Developers

```typescript
// ✅ Good: Input validation
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

// ✅ Good: Environment variables
const apiKey = process.env.VITE_API_KEY;
if (!apiKey) {
  throw new Error('API key is required');
}

// ❌ Avoid: Hardcoded secrets
const apiKey = 'abc123-secret-key'; // Never do this!
```

### For Users

- **🔐 Strong Passwords**: Use unique, complex passwords
- **🔄 Regular Updates**: Keep your browser updated
- **🛡️ Secure Connections**: Always use HTTPS
- **📧 Verify Emails**: Be cautious of phishing attempts

## 📚 Security Resources

### Internal Documentation
- [Development Security Guidelines](CONTRIBUTING.md#security-guidelines)
- [Privacy Policy](PRIVACY_POLICY.md)
- [Crawler Protection Documentation](CRAWLER_PROTECTION.md)

### External Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://react.dev/learn/keeping-components-pure)
- [Vite Security Guide](https://vitejs.dev/guide/env-and-mode.html#security-notes)

## 📞 Emergency Contact

For **critical security incidents** requiring immediate attention:

**🚨 Emergency Hotline**: +31 (0)6 1234 5678  
**📧 Emergency Email**: security-emergency@on-track.nl  
**⏰ Availability**: 24/7 for critical issues

## 🔄 Policy Updates

This security policy is reviewed and updated:
- **Quarterly**: Regular review schedule
- **As needed**: When new threats emerge
- **Post-incident**: After security incidents

**Last Updated**: January 2025  
**Next Review**: April 2025  
**Version**: 1.0

---

**Thank you for helping keep On-Track secure! 🛡️**
