// rulebook.js
class NaiveteRulebook extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.pages = [
      `
      <h3>Digitalknuckles Licensing & Legal Disclosures</h3>
      <p>
      This website, all associated smart contracts, and all DigitalKnuckles NFTs
      are created and published by <strong>Digitalknuckles</strong> (“Creator”, “Designer”).
      By minting, purchasing, holding, or transferring a DigitalKnuckles NFT, you
      agree to the following terms.
      </p>
      `,

      `
      <h3>1. Intellectual Property Ownership</h3>
      <p>
        All artwork, designs, characters, animations, metadata, names, logos,
        trademarks, copyrights, and associated intellectual property remain the
        exclusive property of Digitalknuckles.
      </p>
      <p>
        No ownership of intellectual property is transferred through the sale or
        transfer of an NFT.
      </p>
      `,

      `
      <h3>2. License Granted to NFT Holders</h3>
      <p>
        Subject to continued ownership of a valid DigitalKnuckles NFT, holders are
        granted a <strong>limited, non-exclusive, non-transferable, revocable license</strong>
        to display the associated artwork for:
      </p>
        <ul>
        <li>Personal, non-commercial use</li>
        <li>Display in virtual galleries, wallets, or social media</li>
        <li>Resale or transfer of the NFT itself</li>
        </ul>
        <p>
        Commercial use, sublicensing, merchandising, reproduction, modification,
        or derivative works are strictly prohibited unless explicitly licensed in writing.
        </p>
      `,

      `
        <h3>3. NFT Secondary Sales & Creator Royalties</h3>
        <p>
          Certain DigitalKnuckles NFTs include on-chain royalty logic implemented
          through ERC-compatible smart contracts (e.g., ERC-2981 or marketplace-level enforcement).
        </p>
        <p>
          Any creator royalty is a <strong>technical feature of the smart contract</strong>,
          not a legal entitlement, revenue share, investment return, or security interest.
          Royalties are only applied if and when supported by the executing marketplace
          or protocol.
        </p>
      
        <p>
          Digitalknuckles makes no representations or guarantees regarding:
        </p>
        <ul>
          <li>Royalty enforcement on secondary markets</li>
          <li>Marketplace compliance</li>
          <li>Future royalty standards or implementations</li>
        </ul>
      `,

      `
        <h3>5. No Financial Rights or Investment Intent</h3>
        <p>
          DigitalKnuckles NFTs are <strong>digital collectibles</strong> intended for
          creative, artistic, entertainment, and access purposes only.
        </p>
        <p>
          NFTs do not represent:
        </p>
        <ul>
          <li>Equity or ownership in Digitalknuckles</li>
          <li>Profit-sharing or revenue participation</li>
          <li>Dividends, yield, or passive income</li>
          <li>Voting rights or governance rights</li>
        </ul>
      
        <p>
          No expectation of profit is promoted or implied from the efforts of
          Digitalknuckles or any third party.
        </p>
      `,

`
  <h3>6. Regulatory Disclosures (SEC / MiCA)</h3>
  <p>
    DigitalKnuckles NFTs are not securities, financial instruments, or investment
    products under U.S. securities laws, including the Howey Test, nor under the
    EU Markets in Crypto-Assets Regulation (MiCA).
  </p>
  <p>
    NFTs are not marketed as investments, are not pooled, and do not rely on
    managerial efforts to generate financial returns.
  </p>
`,

      `
  <h3>7. No Guarantees or Roadmap Commitments</h3>
  <p>
    Any references to future features, utilities, experiences, games, or
    integrations are aspirational and non-binding.
  </p>
  <p>
    Digitalknuckles reserves the right to modify, pause, or discontinue any
    aspect of the project at any time.
  </p>
      `,

      `
  <h3>8. Assumption of Risk</h3>
  <p>
    NFTs involve technological, regulatory, and market risks, including but not
    limited to smart contract vulnerabilities, platform failure, and market volatility.
  </p>

  <p>
    By interacting with this website or associated smart contracts, you assume
    all risks and agree that Digitalknuckles shall not be liable for any losses.
  </p>

  <h3>9. Governing Law</h3>
  <p>
    These terms are governed by applicable laws without regard to conflict of
    law principles.
  </p>
      <button class="close-btn">Close</button>
      `
    ];

    this.pageIndex = 0;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(18px);
          background: rgba(0,0,0,0.65);
          z-index: 9999;
          animation: fadeIn .3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } }
        .panel {
          width: min(650px, 90vw);
          max-height: 90vh;
          background: rgba(25, 25, 28, 0.92);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 18px;
          padding: 28px;
          overflow-y: auto;
          color: #fff;
          font-family: Inter, sans-serif;
        }
        h1, h2 { margin-bottom: 12px; font-weight: 700; }
        p, li { line-height: 1.45; font-size: 0.95rem; }
        ul,ol { margin-left: 18px; margin-bottom: 12px; }
        .nav { display:flex; justify-content:space-between; margin-top:18px; }
        button {
          background: linear-gradient(90deg,#ff6ad5,#ffd36a);
          border-radius:999px;
          border:none;
          padding:9px 18px;
          font-weight:600;
          cursor:pointer;
          color:#000;
        }
        .close-btn { width:100%; margin-top:18px; }
        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          margin-top: 12px;
        }
        .video-wrapper iframe {
          position: absolute;
          width:100%;
          height:100%;
          border-radius: 12px;
        }
        .cid-link {
          display:block;
          margin-top:12px;
          color:#ffd36a;
          text-decoration:underline;
        }
      </style>

      <div class="panel">
        <div class="content"></div>
        <div class="nav">
          <button id="prev">← Back</button>
          <button id="next">Next →</button>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.content = this.shadowRoot.querySelector(".content");
    this.prevBtn = this.shadowRoot.querySelector("#prev");
    this.nextBtn = this.shadowRoot.querySelector("#next");

    this.renderPage();

    this.prevBtn.addEventListener("click", () => this.changePage(-1));
    this.nextBtn.addEventListener("click", () => this.changePage(+1));

    // ✅ close when clicking outside panel
    this.shadowRoot.addEventListener("click", (e) => {
      if (e.target === this.shadowRoot.host) this.close();
    });

    // ✅ ESC closes
    window.addEventListener("keydown", this.keyHandler = (e) => {
      if (e.key === "Escape") this.close();
    });
  }

  disconnectedCallback() {
    window.removeEventListener("keydown", this.keyHandler);
  }

  changePage(direction) {
    this.pageIndex = Math.max(0, Math.min(this.pageIndex + direction, this.pages.length - 1));
    this.renderPage();
  }

  renderPage() {
    this.content.innerHTML = this.pages[this.pageIndex];

    const closeBtn = this.shadowRoot.querySelector(".close-btn");
    if (closeBtn) closeBtn.addEventListener("click", () => this.close());
  }

  close() {
    this.remove();
  }
}

customElements.define("naivete-rulebook", NaiveteRulebook);
