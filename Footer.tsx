import { Link } from 'react-router-dom';
import { GraduationCap, Twitter, Github, Linkedin, Instagram } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Security', 'Changelog'],
  Tools: ['AI Chat', 'Notes Generator', 'Quiz Creator', 'Flashcards'],
  Resources: ['Help Center', 'Guides', 'Blog', 'Community'],
  Company: ['About', 'Careers', 'Contact', 'Press'],
};

const socialLinks = [
  { icon: Twitter, href: '#' },
  { icon: Github, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Instagram, href: '#' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 z-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-slate-900">StudyAI</span>
            </Link>
            <p className="text-slate-600 text-sm mb-6 max-w-xs">
              AI-powered study assistant helping students learn smarter, not harder.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-green-500 hover:shadow-md transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-slate-900 mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-600 hover:text-green-600 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2026 StudyAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-700">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-700">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-700">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
