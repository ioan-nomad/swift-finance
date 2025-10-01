# 🔒 Backup Guide - Swift Finance

Sistemul complet de backup pentru protejarea codului și datelor Swift Finance.

## 📋 Scripturi Disponibile

### 1. 🚀 `full-backup.bat` - Backup Complet (RECOMANDAT)
**Când:** Înainte de modificări majore, features noi, refactoring

```batch
# Rulează din Windows Explorer:
Double-click pe full-backup.bat

# Sau din Command Prompt:
cd C:\Users\ciupe\Desktop\swift-finance
full-backup.bat
```

**Ce face:**
- ✅ Commit automat al schimbărilor curente
- ✅ Push pe GitHub (branch main)
- ✅ Creează branch backup cu timestamp
- ✅ Push branch backup pe GitHub
- ✅ Creează ZIP local cu toate fișierele
- ✅ Cleanup automat (păstrează ultimele 5 backups)
- ✅ Verificări și raport final

---

### 2. 🌿 `git-backup.bat` - Backup Git Branch
**Când:** Înainte de feature nou, experiment, sau test

```batch
# Backup cu nume generic:
git-backup.bat

# Backup cu nume specific:
git-backup.bat feature-payments
git-backup.bat experiment-ui
git-backup.bat stable-version
```

**Ce face:**
- ✅ Verifică repo Git valid
- ✅ Alertă pentru uncommitted changes
- ✅ Creează branch backup
- ✅ Push pe GitHub
- ✅ Afișează branch-urile backup recente

---

### 3. 💾 `backup.bat` - Backup Simplu și Rapid
**Când:** Backup rapid fără complications

```batch
backup.bat
```

**Ce face:**
- ✅ Copiază tot proiectul în OneDrive
- ✅ Format simplu cu timestamp
- ✅ Rapid și eficient

---

## 🔄 Workflow Recomandat

### Pentru Development Zilnic:
```bash
1. Dimineața: full-backup.bat (backup stabil)
2. Înainte de feature nou: git-backup.bat feature-name
3. Seara: backup.bat (backup rapid)
```

### Pentru Modificări Majore:
```bash
1. full-backup.bat (backup complet)
2. Fă modificările
3. Testează totul
4. git-backup.bat stable (când e gata)
```

### Pentru Experimente:
```bash
1. git-backup.bat experiment-name
2. Experimentează liber
3. Dacă merge: merge în main
4. Dacă nu merge: git checkout main
```

---

## 📁 Locații Backup

### Git Branches (GitHub):
- `main` - Branch principal
- `backup-YYYYMMDD_HHMMSS` - Backup automat
- `backup-feature-name-TIMESTAMP` - Backup cu nume
- `backup-stable` - Backup stabil manual

### ZIP Files (Local):
```
C:\Users\ciupe\Desktop\swift-finance-backups\
├── swift-finance-full-backup-20241001_143022.zip
├── swift-finance-full-backup-20241001_120145.zip
└── ...
```

### OneDrive Backup:
```
C:\Users\ciupe\OneDrive\Backups\
├── swift-finance-20241001/
├── swift-finance-20240930/
└── ...
```

---

## 🛠 Recovery Guide

### Recuperare din Git Branch:
```bash
# Vezi toate branch-urile backup:
git branch -a | grep backup

# Schimbă la un backup specific:
git checkout backup-20241001_143022

# Sau creează branch nou din backup:
git checkout -b recovery-branch backup-20241001_143022
```

### Recuperare din ZIP:
1. Deschide `C:\Users\ciupe\Desktop\swift-finance-backups\`
2. Găsește ZIP-ul dorit
3. Extrage într-un folder nou
4. Copiază fișierele necesare

### Recuperare din OneDrive:
1. Deschide `C:\Users\ciupe\OneDrive\Backups\`
2. Găsește folderul cu data dorită
3. Copiază fișierele înapoi

---

## ⚙️ Configurare și Întreținere

### Configurare Inițială:
```bash
# Verifică că toate scripturile sunt executable:
cd C:\Users\ciupe\Desktop\swift-finance
dir *.bat

# Testează fiecare script:
backup.bat
git-backup.bat test
full-backup.bat
```

### Întreținere Regulată:
- **Săptămânal:** Verifică că backup-urile se creează corect
- **Lunar:** Curăță backup-urile vechi manual dacă e necesar
- **Înainte de vacanță:** `full-backup.bat` obligatoriu!

### Cleanup Manual:
```bash
# Șterge branch-uri backup vechi (peste 1 lună):
git branch -d backup-20240901_120000
git push origin --delete backup-20240901_120000

# Șterge ZIP-uri vechi (scriptul face automat, dar poți manual):
del "C:\Users\ciupe\Desktop\swift-finance-backups\swift-finance-*-202409*.zip"
```

---

## 🚨 Emergency Recovery

### Dacă pierzi tot proiectul:
1. **Git Clone:** `git clone https://github.com/your-repo/swift-finance.git`
2. **Restore din backup ZIP** cel mai recent
3. **Compară și merge** diferențele

### Dacă GitHub e down:
1. Folosește backup-urile ZIP locale
2. Sau backup-urile din OneDrive
3. Continuă development local

### Dacă ai făcut greșeli majore:
```bash
# Revino la ultimul backup:
git checkout backup-stable

# Sau la un backup specific:
git checkout backup-20241001_143022

# Creează branch nou pentru recovery:
git checkout -b fix-mistakes backup-20241001_143022
```

---

## 📊 Monitoring

### Verifică Status Backup:
```bash
# Ultimele commit-uri:
git log --oneline -5

# Branch-uri backup disponibile:
git branch | grep backup

# ZIP-uri locale:
dir "C:\Users\ciupe\Desktop\swift-finance-backups\*.zip" /o-d

# Space usage:
dir "C:\Users\ciupe\Desktop\swift-finance-backups\" /s
```

---

## 💡 Tips & Best Practices

1. **📅 Backup regulat:** Fă backup înainte de orice schimbare importantă
2. **🏷️ Nume descriptive:** Folosește nume clare pentru backup-uri (`git-backup.bat stable-before-refactor`)
3. **🧪 Testează recovery:** Testează periodic că poți recupera din backup-uri
4. **📱 Multiple locații:** Nu te baza doar pe o metodă de backup
5. **⏰ Timing:** Fă backup când ești relaxat, nu în grabă
6. **📝 Commit messages:** Scrie commit messages clare înainte de backup
7. **🔍 Verifică:** Verifică că backup-ul s-a creat corect înainte să continui

---

## 🎯 Quick Commands

```bash
# Backup rapid înainte de schimbare:
full-backup.bat

# Backup înainte de feature nou:
git-backup.bat feature-dashboard

# Backup stabil după finalizare:
git-backup.bat stable

# Recovery rapid:
git checkout backup-stable

# Cleanup rapid:
git branch | grep backup | head -10
```

---

*Última actualizare: Octombrie 2024*
*Versiune: Swift Finance v1.0*