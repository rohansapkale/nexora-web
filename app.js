/**
 * NEXORA — ENGINEERING SHOWCASE SCRIPT
 * Product: MediTrack (MediTrack Web & MediTrack Mob)
 * Tagline: Connect • Build • Automate
 * Strictly Formal Monochrome Architecture
 */

(function () {
  'use strict';

  // 1. Theme Switcher (Dark / Light)
  const STORAGE_KEY = 'nexora_meditrack_theme';
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeToggleText = document.getElementById('theme-toggle-text');
  const themeToggleIcon = document.getElementById('theme-toggle-icon');

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    if (theme === 'dark') {
      if (themeToggleText) themeToggleText.textContent = 'Light Mode';
      if (themeToggleIcon) themeToggleIcon.textContent = '○';
    } else {
      if (themeToggleText) themeToggleText.textContent = 'Dark Mode';
      if (themeToggleIcon) themeToggleIcon.textContent = '●';
    }
  }

  // Initial theme application
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // 2. Filter Tabs (All / Web / Mob / Architecture)
  const filterButtons = document.querySelectorAll('[data-filter]');
  const filterTargets = document.querySelectorAll('[data-category]');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      filterTargets.forEach((target) => {
        const category = target.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category === 'shared') {
          target.style.display = '';
        } else {
          target.style.display = 'none';
        }
      });
    });
  });

  // 3. Technical Modal Breakdown Data
  const TECHNICAL_MODALS = {
    'web-compilation': {
      eyebrow: 'MediTrack Web • Core Engine',
      title: 'Multi-Tiered Compilation & Reconciliation Engine',
      description: `The Compilation Engine bridges stockist dispatches, chemist sales orders, and doctor prescriptions into a verified, auditable pharmaceutical ledger. Built with Angular 20 and RxJS reactive streams, it handles high-volume tabular reconciliation without blocking the main browser thread.`,
      specs: [
        { label: 'State Model', value: 'NGXS @State(CompilationState)' },
        { label: 'Data Validation', value: 'Client + Server Multi-stage Checks' },
        { label: 'Reconciliation Flow', value: 'Draft → Audit → Verify → Publish' },
        { label: 'Export Protocol', value: 'Streaming XLSX & Signed PDF Reports' }
      ],
      codeSnippet: `// Compilation State Transition (MediTrack Web)
@Action(PublishCompilation)
publish(ctx: StateContext<CompilationStateModel>, { id }: PublishCompilation) {
  ctx.patchState({ isPublishing: true });
  return this.compilationService.publish(id).pipe(
    tap((record) => {
      ctx.dispatch(new LoadCompilationsSuccess());
      this.notification.success('Compilation successfully audited & published.');
    }),
    catchError((err) => this.handleApiError(ctx, err))
  );
}`
    },
    'web-requisitions': {
      eyebrow: 'MediTrack Web • Governance',
      title: 'Hierarchical Requisition & Approval State Machine',
      description: `Requisitions allow pharmaceutical branch offices and field teams to request marketing allocations, sample dispatches, and monetary grants. Enforces strict financial limits, departmental quotas, and automated multi-level sign-offs between Regional Managers and Central Administration.`,
      specs: [
        { label: 'Approval Hierarchy', value: 'Regional Manager → General Admin' },
        { label: 'Concurrency Control', value: 'Optimistic Locking via RowVersion' },
        { label: 'Audit Trail', value: 'Immutable Timestamped Activity Log' },
        { label: 'Notification', value: 'Real-time WebSocket & In-App Toast' }
      ],
      codeSnippet: `// Requisition Approval Guard & Action
@Action(ApproveRequisition)
approve(ctx: StateContext<RequisitionStateModel>, { requisitionId, comment }: ApproveRequisition) {
  return this.requisitionService.approve({ id: requisitionId, comments: comment }).pipe(
    tap(() => ctx.dispatch(new RefreshRequisitionList()))
  );
}`
    },
    'mob-scheme': {
      eyebrow: 'MediTrack Mob • Field Operations',
      title: 'Pharma Scheme & Margin Calculator',
      description: `In pharmaceutical trade, schemes (e.g., 10+1 free, 15% trade bonus, cash discounts) determine chemist profitability on the fly. The Scheme Calculator is written in pure TypeScript within the Ionic/Angular mobile container, allowing Medical Representatives to compute net purchase prices and chemist ROI even with zero network connectivity.`,
      specs: [
        { label: 'Execution Mode', value: '100% Client-side Offline Engine' },
        { label: 'Formulas', value: 'PTR, PTS, Margin %, Free Ratio, GST' },
        { label: 'Framework', value: 'Ionic 8 + Angular Reactive Forms' },
        { label: 'Persistence', value: 'Capacitor Storage Preferences' }
      ],
      codeSnippet: `// Scheme Calculation Algorithm (MediTrack Mob)
calculateNetPrice(pts: number, dealQty: number, freeQty: number, discountPct: number): SchemeResult {
  const effectiveUnits = dealQty + freeQty;
  const baseTotal = dealQty * pts;
  const discountAmount = (baseTotal * discountPct) / 100;
  const netLandingPrice = (baseTotal - discountAmount) / effectiveUnits;
  return { netLandingPrice, discountAmount, effectiveUnits };
}`
    },
    'mob-capacitor': {
      eyebrow: 'MediTrack Mob • Native Bridge',
      title: 'Capacitor Native Hardware Integration & Field Resilience',
      description: `MediTrack Mob leverages Capacitor 7 plugins to interact with native Android APIs while maintaining a single, clean TypeScript codebase. Features secure storage in Android Keystore, native status bar edge-to-edge drawing, haptic feedback during form submissions, and graceful offline network detection.`,
      specs: [
        { label: 'Runtime', value: 'Capacitor 7.2 Native Android/iOS Bridge' },
        { label: 'Security', value: 'Hardware-backed Encrypted Keystore' },
        { label: 'Visualization', value: 'ApexCharts + High-DPI Canvas' },
        { label: 'Package Size', value: 'Under 14MB Optimized Production APK' }
      ],
      codeSnippet: `// Native Token Persistence & Haptic Feedback
import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export async function storeSessionToken(token: string): Promise<void> {
  await Preferences.set({ key: 'access_token', value: token });
  await Haptics.impact({ style: ImpactStyle.Light });
}`
    },
    'cloud-architecture': {
      eyebrow: 'Backend & Infrastructure',
      title: 'ASP.NET Core ABP Clean Architecture & Cloud Postgres',
      description: `Both MediTrack Web and MediTrack Mob consume a unified backend built on ASP.NET Core (.NET 8) and ABP Framework. Adheres strictly to Domain-Driven Design (DDD) principles with separated Domain, Application, Entity Framework Core Data, and Web Host layers. Hosted on Render with containerized multi-stage Docker builds and Supabase managed PostgreSQL.`,
      specs: [
        { label: 'Backend Core', value: 'ASP.NET Core (.NET 8) + ABP DDD' },
        { label: 'Database', value: 'PostgreSQL 15 (Supabase Cloud)' },
        { label: 'Authentication', value: 'OAuth2 / JWT Bearer with Refresh Tokens' },
        { label: 'Contract Generator', value: 'NSwag Automated TypeScript DTOs' }
      ],
      codeSnippet: `// Auto-generated Service Proxy Contract (NSwag)
export class TokenAuthServiceProxy {
  authenticate(body: AuthenticateModel): Observable<AuthenticateResultModel> {
    return this.http.post<AuthenticateResultModel>(
      \`\${this.baseUrl}/api/TokenAuth/Authenticate\`, 
      body
    );
  }
}`
    }
  };

  // 4. Modal Controller
  const modalOverlay = document.getElementById('tech-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalEyebrow = document.getElementById('modal-eyebrow');
  const modalHeading = document.getElementById('modal-heading');
  const modalDescription = document.getElementById('modal-description');
  const modalSpecsContainer = document.getElementById('modal-specs');
  const modalCode = document.getElementById('modal-code');

  function openModal(techKey) {
    const data = TECHNICAL_MODALS[techKey];
    if (!data || !modalOverlay) return;

    modalEyebrow.textContent = data.eyebrow;
    modalHeading.textContent = data.title;
    modalDescription.textContent = data.description;
    modalCode.textContent = data.codeSnippet;

    modalSpecsContainer.innerHTML = '';
    data.specs.forEach((s) => {
      const cell = document.createElement('div');
      cell.className = 'spec-cell';
      cell.innerHTML = `<strong>${s.label}</strong><span>${s.value}</span>`;
      modalSpecsContainer.appendChild(cell);
    });

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-tech-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const techKey = trigger.getAttribute('data-tech-modal');
      openModal(techKey);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

})();
