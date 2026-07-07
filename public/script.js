(function() {
  if (window.__SCRIPT_INITIALIZED__) return;
  window.__SCRIPT_INITIALIZED__ = true;


    // ── BOOT ─────────────────────────────────────────────────────────────────
    const BOOT_LINES = ['Initializing kernel...', 'Loading system modules...', 'Mounting filesystem...', 'Starting network services...', 'Loading portfolio.exe...', 'Compiling assets...', 'Connecting to database...', 'System ready. Welcome.'];
    const bootEl = document.getElementById('boot-lines'), bootBar = document.getElementById('boot-bar'), bootScreen = document.getElementById('boot');

    // Progress bar runs independently — smooth CSS animation over total boot time
    const TOTAL_BOOT_MS = BOOT_LINES.length * 380 + 800;
    bootBar.style.transition = `width ${TOTAL_BOOT_MS}ms cubic-bezier(0.1,0,0.2,1)`;
    setTimeout(() => bootBar.style.width = '100%', 50);

    // Lines load at their own pace
    let bl = 0;
    function nextLine() {
      if (bl >= BOOT_LINES.length) {
        setTimeout(() => bootScreen.classList.add('done'), 700);
        return;
      }
      const d = document.createElement('div'); d.className = 'boot-line';
      d.innerHTML = `<span class="boot-ok">[  OK  ]</span>${BOOT_LINES[bl]}`;
      bootEl.appendChild(d);
      requestAnimationFrame(() => requestAnimationFrame(() => d.classList.add('show')));
      bl++; setTimeout(nextLine, bl === BOOT_LINES.length ? 800 : 380);
    }
    setTimeout(nextLine, 400);

    // ── MATRIX RAIN ──────────────────────────────────────────────────────────
    (function () {
      const c = document.getElementById('matrix');
      const ctx = c.getContext('2d');
      function resize() { c.width = window.innerWidth; c.height = window.innerHeight }
      resize(); window.addEventListener('resize', resize, { passive: true });
      const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
      const fs = 14; let cols = Math.floor(c.width / fs); let drops = Array(cols).fill(1);
      let last = 0;
      function draw(ts) {
        if (ts - last < 80) { requestAnimationFrame(draw); return } last = ts;
        ctx.fillStyle = 'rgba(5,15,10,0.05)'; ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = '#00ff88'; ctx.font = fs + 'px JetBrains Mono';
        cols = Math.floor(c.width / fs);
        if (drops.length < cols) drops = drops.concat(Array(cols - drops.length).fill(1));
        for (let i = 0; i < cols; i++) {
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, drops[i] * fs);
          if (drops[i] * fs > c.height && Math.random() > .975) drops[i] = 0;
          drops[i]++;
        }
        requestAnimationFrame(draw);
      }
      requestAnimationFrame(draw);
      document.addEventListener('visibilitychange', () => { if (document.hidden) last = Infinity; else last = 0 });
    })();

    // ── CURSOR ───────────────────────────────────────────────────────────────
    const cur = document.getElementById('cur'), ring = document.getElementById('cur-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px' }, { passive: true });
    (function lp() { rx += (mx - rx) * .12; ry += (my - ry) * .12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(lp) })();
    document.querySelectorAll('a,button,summary,.editor-tab,.sidebar-file,.tilt-card').forEach(el => {
      el.addEventListener('mouseenter', () => { ring.style.width = '44px'; ring.style.height = '44px'; ring.style.borderColor = 'rgba(0,255,136,0.8)' });
      el.addEventListener('mouseleave', () => { ring.style.width = '32px'; ring.style.height = '32px'; ring.style.borderColor = 'rgba(0,255,136,0.5)' });
    });

    // ── SCROLL PROGRESS ──────────────────────────────────────────────────────
    const prog = document.getElementById('prog');
    window.addEventListener('scroll', () => { prog.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%' }, { passive: true });

    // ── NAV ──────────────────────────────────────────────────────────────────
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
    const burger = document.getElementById('burger'), mob = document.getElementById('nav-mob');
    let mo = false;
    burger.addEventListener('click', () => { mo = !mo; mob.style.display = mo ? 'block' : 'none' });
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mo = false; mob.style.display = 'none' }));
    const secs = document.querySelectorAll('section[id]'), nls = document.querySelectorAll('.nav-links a');
    secs.forEach(s => new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) nls.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)) }) }, { threshold: .4 }).observe(s));

    // ── REVEAL ───────────────────────────────────────────────────────────────
    document.querySelectorAll('.reveal').forEach(el => new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') }) }, { threshold: .08 }).observe(el));

    // ── TYPEWRITER ───────────────────────────────────────────────────────────
    const phrases = ['Aspiring Full Stack Developer', 'Building Scalable Web & AI Systems', 'CS Undergraduate'];
    let pi = 0, ci = 0, del = false;
    const twEl = document.getElementById('tw-text');
    function type() {
      if (!twEl) return;
      const p = phrases[pi];
      if (!del) { twEl.textContent = p.slice(0, ++ci); if (ci === p.length) { del = true; setTimeout(type, 1800); return } }
      else { twEl.textContent = p.slice(0, --ci); if (ci === 0) { del = false; pi = (pi + 1) % phrases.length } }
      setTimeout(type, del ? 40 : 80);
    }
    type();

    // ── SKILLS TAB ───────────────────────────────────────────────────────────
    window.switchTab = function switchTab(tabEl, id) {
      document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.sidebar-file').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.skill-pane').forEach(p => p.classList.remove('active'));
      tabEl.classList.add('active');
      document.querySelectorAll('.sidebar-file[data-tab="' + id + '"]').forEach(f => f.classList.add('active'));
      const pane = document.getElementById('pane-' + id);
      pane.classList.add('active');
      pane.querySelectorAll('.skill-bar').forEach(b => { b.style.width = '0%'; setTimeout(() => b.style.width = b.dataset.w + '%', 60) });
    }
    // Animate bars on scroll
    new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) document.querySelectorAll('.skill-pane.active .skill-bar').forEach(b => b.style.width = b.dataset.w + '%') }) }, { threshold: .2 }).observe(document.querySelector('.editor') || document.body);

    // ── 3D TILT ───────────────────────────────────────────────────────────────
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(4px)`;
      });
      card.addEventListener('mouseleave', () => card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateZ(0)');
    });

    // ── SCROLL HELPER ────────────────────────────────────────────────────────
    window.navTo = function navTo(id) { document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }) }
  


    // ── AI AGENT CHATBOT ─────────────────────────────────────────────────────

    // ─── CONFIG ───────────────────────────────────────────────────────────────
    const SUPABASE_URL = 'https://cuelksidwgkpczmshzmi.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1ZWxrc2lkd2drcGN6bXNoem1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5OTMzNDAsImV4cCI6MjA5MTU2OTM0MH0.KFDAXBPlXvb_GM0Vm9eZ5SFrSnsVyhfV1pla_o1LdNU';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const MAX_FILES = 10;
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // Increased to 10MB
    // Removed ALLOWED_TYPES to allow any file format

    // ─── DOM REFS ─────────────────────────────────────────────────────────────
    let avatarBtn = document.getElementById('ai-avatar-btn');
    let chatWidget = document.getElementById('ai-chat-widget');
    let closeBtn = document.getElementById('ai-chat-close');
    let sendBtn = document.getElementById('ai-send-btn');
    let inputField = document.getElementById('ai-input');
    let messagesContainer = document.getElementById('ai-messages');
    let errorMsgContainer = document.getElementById('ai-error-msg');
    let errorText = document.getElementById('ai-error-text');
    let errorClose = document.getElementById('ai-error-close');
    let sendIcon = document.getElementById('ai-send-icon');
    let loaderIcon = document.getElementById('ai-loader-icon');
    let fileInput = document.getElementById('ai-file-input');
    let attachBtn = document.getElementById('ai-attach-btn');
    let filePreviews = document.getElementById('ai-file-previews');
    let statusDot = document.getElementById('ai-status-dot');

    
    window.__REINIT_CHAT_DOM = function() {
      avatarBtn = document.getElementById('ai-avatar-btn');
      chatWidget = document.getElementById('ai-chat-widget');
      closeBtn = document.getElementById('ai-chat-close');
      sendBtn = document.getElementById('ai-send-btn');
      inputField = document.getElementById('ai-input');
      messagesContainer = document.getElementById('ai-messages');
      errorMsgContainer = document.getElementById('ai-error-msg');
      errorText = document.getElementById('ai-error-text');
      errorClose = document.getElementById('ai-error-close');
      sendIcon = document.getElementById('ai-send-icon');
      loaderIcon = document.getElementById('ai-loader-icon');
      fileInput = document.getElementById('ai-file-input');
      attachBtn = document.getElementById('ai-attach-btn');
      filePreviews = document.getElementById('ai-file-previews');
      statusDot = document.getElementById('ai-status-dot');
    };

    // ─── STATE ────────────────────────────────────────────────────────────────
    let isOpen = false;
    let isLoading = false;
    let isUploading = false;
    let chatHistory = [];
    let agentFiles = []; // { id, name, type, size, url }
    let pendingAction = null;
    let processedActions = new Set();
    const sessionId = crypto.randomUUID();

    // ─── UTILS ────────────────────────────────────────────────────────────────
    function setStatus(busy) {
      statusDot.classList.toggle('busy', busy);
    }

    function setLoading(val) {
      isLoading = val;
      setStatus(val);
      inputField.disabled = val || isUploading;
      sendBtn.disabled = val || isUploading;
      sendIcon.style.display = val ? 'none' : 'block';
      loaderIcon.style.display = val ? 'block' : 'none';
    }

    function scrollToBottom() {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function appendSystemMessage(text) {
      appendMessage('system', text);
    }
    function appendMessage(cssRole, text, shouldType = false) {
      const wrapper = document.createElement('div');
      wrapper.className = 'message-wrapper';
      const msgDiv = document.createElement('div');
      msgDiv.className = `message ${cssRole}`;

      if (shouldType && cssRole === 'assistant') {
        msgDiv.textContent = '';
        wrapper.appendChild(msgDiv);
        messagesContainer.appendChild(wrapper);
        return { wrapper, promise: typeMessage(msgDiv, text) };
      } else {
        msgDiv.textContent = text;
        wrapper.appendChild(msgDiv);
        messagesContainer.appendChild(wrapper);
        scrollToBottom();
        return wrapper;
      }
    }

    async function typeMessage(element, text) {
      const words = text.split(' ');
      element.textContent = '';

      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      element.appendChild(cursor);

      for (let i = 0; i < words.length; i++) {
        const word = words[i] + (i < words.length - 1 ? ' ' : '');
        const wordNode = document.createTextNode(word);
        element.insertBefore(wordNode, cursor);
        scrollToBottom();

        // Natural typing delay
        let delay = 30 + Math.random() * 40;
        if (word.match(/[.,!?]/)) delay += 150;
        if (words.length < 10) delay *= 0.7; // Faster for short ones

        await new Promise(r => setTimeout(r, delay));
      }
      cursor.remove();
    }

    function getThinkingDelay(text) {
      const len = text.length;
      const complexity = (text.match(/explain|how|why|difference|architecture|stack|projects|built|skills/gi) || []).length;

      let range;
      if (len < 15 && complexity === 0) range = [600, 1100];
      else if (complexity > 1 || len > 100) range = [2200, 3800];
      else range = [1100, 2200];

      return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
    }

    function showThinking() {
      const thinkingDiv = document.createElement('div');
      thinkingDiv.className = 'thinking-indicator';
      thinkingDiv.id = 'ai-thinking';
      thinkingDiv.innerHTML = `<span>Thinking</span><div class="thinking-dots"><span></span><span></span><span></span></div>`;
      messagesContainer.appendChild(thinkingDiv);
      scrollToBottom();
    }

    function removeThinking() {
      const t = document.getElementById('ai-thinking');
      if (t) t.remove();
    }

    // ─── CHAT TOGGLE ─────────────────────────────────────────────────────────
    window.toggleChat = function toggleChat() {
      isOpen = !isOpen;
      if (isOpen) {
        chatWidget.style.display = 'flex';
        avatarBtn.style.display = 'none';
        setTimeout(() => inputField.focus(), 100);
        scrollToBottom();
      } else {
        chatWidget.style.display = 'none';
        avatarBtn.style.display = 'flex';
      }
    }

    
    
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen) toggleChat(); });

    

    // ─── FILE UPLOAD ─────────────────────────────────────────────────────────
    
    

    window.handleFileDrop = function (e) {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    };

    window.handleFileSelect = function handleFileSelect(e) {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
        e.target.value = '';
      }
    }

    async function processFiles(fileList) {
      if (agentFiles.length + fileList.length > MAX_FILES) {
        showError(`Maximum ${MAX_FILES} files allowed.`);
        return;
      }

      isUploading = true;
      inputField.disabled = true;
      sendBtn.disabled = true;
      inputField.placeholder = 'Uploading files...';

      for (const file of Array.from(fileList)) {
        if (file.size > MAX_FILE_SIZE) {
          showError(`${file.name} exceeds 5MB limit.`);
          continue;
        }
        // Removed type check to allow any file format

        const fileId = crypto.randomUUID();
        const ext = file.name.split('.').pop();
        const path = `${sessionId}/${fileId}.${ext}`;

        const { data, error } = await supabaseClient.storage.from('assistant-files').upload(path, file);
        if (error) {
          console.error("Supabase Upload Error:", error);
          showError(`Failed to upload ${file.name}: ${error.message}`);
          continue;
        }

        const { data: { publicUrl } } = supabaseClient.storage.from('assistant-files').getPublicUrl(path);
        const meta = { id: fileId, name: file.name, type: file.type, size: file.size, url: publicUrl };
        agentFiles.push(meta);
        addFilePreview(meta, file);
      }

      isUploading = false;
      inputField.disabled = false;
      sendBtn.disabled = false;
      inputField.placeholder = 'Ask me anything...';
    }

    function addFilePreview(meta, rawFile) {
      filePreviews.style.display = 'flex';
      const thumb = document.createElement('div');
      thumb.className = 'file-preview';
      thumb.dataset.id = meta.id;

      if (meta.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = meta.url;
        img.alt = meta.name;
        thumb.appendChild(img);
      } else {
        const icon = document.createElement('div');
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>';
        thumb.appendChild(icon);
      }

      const nameEl = document.createElement('div');
      nameEl.className = 'file-name';
      nameEl.textContent = meta.name;
      thumb.appendChild(nameEl);

      const rm = document.createElement('div');
      rm.className = 'remove-file';
      rm.innerHTML = '✕';
      rm.title = 'Remove file';
      rm.addEventListener('click', () => {
        agentFiles = agentFiles.filter(f => f.id !== meta.id);
        thumb.remove();
        if (agentFiles.length === 0) filePreviews.style.display = 'none';
      });
      thumb.appendChild(rm);

      filePreviews.appendChild(thumb);
    }

    function showError(msg) {
      errorText.textContent = msg;
      errorMsgContainer.style.display = 'flex';
    }

    // ─── ACTION PARSING ───────────────────────────────────────────────────────
    function extractAction(text) {
      // Try direct parse
      try {
        const parsed = JSON.parse(text.trim());
        if (parsed && parsed.action) return parsed;
      } catch (_) { }

      // Try regex extraction
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) return null;

      try {
        const parsed = JSON.parse(match[0]);
        if (parsed && parsed.action) return parsed;
      } catch (_) { }

      // Try repair (add closing brace)
      try {
        const parsed = JSON.parse(match[0] + '}');
        if (parsed && parsed.action) return parsed;
      } catch (_) { }

      return null;
    }

    // ─── CONFIRMATION CARD ───────────────────────────────────────────────────
    function buildActionCard(action, wrapperEl) {
      pendingAction = action;
      const card = document.createElement('div');
      card.className = 'confirmation-card';
      const cardId = Date.now(); // Unique ID for this card instance

      const filesToShow = action.files || [];
      const fileNames = filesToShow.map(fid => {
        const f = agentFiles.find(af => af.id === fid);
        return f ? f.name : fid;
      });

      const autoSubject = action.subject || `Message from Portfolio Assistant`;

      card.innerHTML = `
        <div class="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          <span>Confirm Action</span>
        </div>
        <div class="card-body">
          <p><strong>To:</strong> ${action.recipient}</p>
          <p><strong>Subject:</strong> ${autoSubject}</p>
          <p><strong>Files (${filesToShow.length}):</strong></p>
          <div class="file-chips">
            ${fileNames.length > 0 ? fileNames.map(n => `<span class="file-chip">📄 ${n}</span>`).join('') : '<span style="font-style:italic;opacity:0.6;">No files attached</span>'}
          </div>
        </div>
        <div class="card-actions">
          <button class="confirm-btn" id="confirm-${cardId}">Confirm</button>
          <button class="cancel-btn" id="cancel-${cardId}">Cancel</button>
        </div>`;

      wrapperEl.appendChild(card);
      scrollToBottom();

      // Attach listeners using the unique IDs
      document.getElementById(`confirm-${cardId}`).addEventListener('click', () => {
        card.remove();
        executeAction({ ...action, subject: autoSubject });
      });
      document.getElementById(`cancel-${cardId}`).addEventListener('click', () => {
        card.remove();
        pendingAction = null;
        appendMessage('assistant', 'Action cancelled. Let me know if you need anything else!');
      });
    }

    // ─── SEND MESSAGE ─────────────────────────────────────────────────────────
    window.sendMessage = async function sendMessage() {
      const text = inputField.value.trim();
      if (!text || isLoading || isUploading) return;

      errorMsgContainer.style.display = 'none';
      inputField.value = '';

      // User message
      appendMessage('user', text);
      chatHistory.push({ role: 'user', content: text });

      setLoading(true);

      // Dynamic Thinking Effect
      const thinkingDelay = getThinkingDelay(text);
      const startTime = Date.now();
      showThinking();

      try {
        const fileContext = agentFiles.length > 0
          ? `\n\n[USER HAS UPLOADED ${agentFiles.length} FILE(S). File IDs: ${agentFiles.map(f => `${f.name} (ID: ${f.id})`).join(', ')}]`
          : '';

        const slicedHistory = chatHistory.slice(-15);
        const messages = slicedHistory.map((m, i) => ({
          role: m.role,
          content: i === slicedHistory.length - 1 ? m.content + fileContext : m.content
        }));

        // Parallel: API call
        const apiPromise = fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages })
        });

        const response = await apiPromise;

        // Ensure minimum thinking time
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < thinkingDelay) {
          await new Promise(r => setTimeout(r, thinkingDelay - elapsedTime));
        }

        if (!response.ok) {
          let errorMessage = `Server error (${response.status})`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorData.details || errorMessage;
          } catch (_) { }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        removeThinking();

        const botText = data.message || "I couldn't understand that. Can you try again?";
        const action = extractAction(botText);

        let finalText = botText;
        let cleanText = botText;
        if (action && action.action) {
          cleanText = botText.replace(/\{[\s\S]*\}/, '').trim() || "I've prepared this action for you:";
        }

        // Start Typing
        const { wrapper, promise } = appendMessage('assistant', cleanText, true);
        await promise;

        chatHistory.push({ role: 'assistant', content: cleanText });

        if (action && action.action) {
          buildActionCard(action, wrapper);
        }

      } catch (err) {
        console.error('AI Chat Error:', err);
        removeThinking();
        const errMsg = err.message || 'Failed to get response. Please try again.';
        showError(errMsg);
        appendMessage('assistant', `⚠️ ${errMsg}`);
      } finally {
        setLoading(false);
        isUploading = false;
        setTimeout(() => inputField.focus(), 100);
      }
    }

    // ─── EXECUTE ACTION ───────────────────────────────────────────────────────
    async function executeAction(action) {
      const actionId = crypto.randomUUID();

      // Idempotency guard
      if (processedActions.has(actionId)) return;
      processedActions.add(actionId);

      setLoading(true);
      appendMessage('assistant', `⏳ Sending ${agentFiles.length} file(s)...`);

      const timeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error('Request timed out')), ms));

      try {
        const filePayload = agentFiles.map(f => ({ id: f.id, name: f.name, type: f.type, url: f.url }));
        const payload = { ...action, actionId, sessionId, files: filePayload };

        const response = await Promise.race([
          fetch('/api/agent/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }),
          timeout(10000)
        ]);

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Action failed');

        appendMessage('assistant', `✅ ${data.message || 'Done! Files sent successfully.'}`);
        pendingAction = null;

      } catch (err) {
        appendMessage('assistant', `❌ Failed to send. ${err.message || 'Please try again.'}`);
        processedActions.delete(actionId);
      } finally {
        setLoading(false);
      }
    }

    
  
})();