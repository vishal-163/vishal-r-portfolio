export function ProjectsSection() {
  return (
    <>
      <section id="projects" className="grid-bg">
    <div className="wrap">
      <div className="reveal">
        <div className="sec-num">03</div>
        <h2 className="sec-title">&lt;Featured Projects /&gt;</h2>
      </div>
      <div className="proj-grid">
        <div className="tilt-card proj-card reveal">
          <div className="proj-header">
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <div style={{display: 'flex', gap: 5}}>
                <div className="tdot" style={{background: '#ff5f57'}} />
                <div className="tdot" style={{background: '#febc2e'}} />
                <div className="tdot" style={{background: '#28c840'}} />
              </div>
              <span className="proj-title">AI Trip Planner</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap'}}>
              <span className="proj-status s-done">✓ Completed</span>
              <a className="proj-link" href="https://github.com/vishal-163/AI-TRIP-PLANNER.git" target="_blank">⎋ Code</a>
            </div>
          </div>
          <div className="proj-body">
            <p className="proj-desc">AI-powered mobile app that generates personalized travel itineraries based on user
              preferences, budget, and duration.</p>
            <details className="proj-details">
              <summary>&gt; key_features.map()</summary>
              <div className="proj-features">
                <div className="proj-feat">Built a cross-platform mobile application generating personalized AI-based travel
                  itineraries based on user preferences, budget, and duration, reducing manual planning effort
                  significantly.</div>
                <div className="proj-feat">Designed a modular three-tier architecture with Flutter frontend, Supabase
                  backend, and a dedicated AI service layer for scalable integration.</div>
                <div className="proj-feat">Engineered structured data flow ensuring deterministic JSON outputs for seamless
                  UI rendering and improved reliability.</div>
                <div className="proj-feat">Implemented secure authentication (email + OAuth), row-level security, and
                  normalized database schema for efficient data handling.</div>
                <div className="proj-feat">Developed full CRUD operations with real-time synchronization using Supabase
                  subscriptions for dynamic updates.</div>
              </div>
            </details>
          </div>
          <div className="proj-tags">
            <span className="proj-tag">Flutter</span><span className="proj-tag">Supabase</span><span className="proj-tag">OpenAI
              API</span><span className="proj-tag">Gemini API</span><span className="proj-tag">PostgreSQL</span>
          </div>
        </div>
        <div className="tilt-card proj-card reveal" style={{transitionDelay: '.1s'}}>
          <div className="proj-header">
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <div style={{display: 'flex', gap: 5}}>
                <div className="tdot" style={{background: '#ff5f57'}} />
                <div className="tdot" style={{background: '#febc2e'}} />
                <div className="tdot" style={{background: '#28c840'}} />
              </div>
              <span className="proj-title">Smart Military Vest</span>
            </div>
            <span className="proj-status s-wip">⏳ In Progress</span>
          </div>
          <div className="proj-body">
            <p className="proj-desc">Defence-grade IoT system for real-time soldier health monitoring and automated
              emergency alerts.</p>
            <details className="proj-details">
              <summary>&gt; key_features.map()</summary>
              <div className="proj-features">
                <div className="proj-feat">Designing a defence-grade wearable system for real-time soldier health monitoring
                  including heart rate, SpO2, temperature, and motion tracking.</div>
                <div className="proj-feat">Built multi-sensor integration using I2C and SPI protocols with on-device
                  preprocessing for efficient data aggregation.</div>
                <div className="proj-feat">Architecting dual-channel communication using LoRa and GSM/4G with AES-256
                  encryption for secure and reliable transmission.</div>
                <div className="proj-feat">Developing an intelligent alert system for automated distress signal generation
                  based on health thresholds.</div>
                <div className="proj-feat">Planning scalable backend architecture using MQTT, time-series database, and
                  analytics dashboard for command centre monitoring.</div>
              </div>
            </details>
          </div>
          <div className="proj-tags">
            <span className="proj-tag">ESP32</span><span className="proj-tag">Sensors</span><span className="proj-tag">LoRa</span><span className="proj-tag">GSM</span><span className="proj-tag">GPS</span>
          </div>
        </div>
      </div>
    </div>
  </section>
    </>
  );
}
