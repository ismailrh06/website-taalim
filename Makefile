# ============================================================
#  QIMMA — Compilation des cours LaTeX
#
#  Moteur : tectonic (recommandé, télécharge ses packages) ou latexmk.
#    make chapter FILE=cours/bac2/sciences-maths/mathematiques/01-limites-et-continuite.tex
#    make matiere DIR=cours/bac2/sciences-maths/mathematiques
#    make poly    DIR=cours/bac2/sciences-maths/mathematiques   (chapitres + polycopié main-*.tex)
#    make clean   DIR=...
#
#  Surcharge du moteur :  make chapter ENGINE="latexmk -xelatex" FILE=...
# ============================================================

ENGINE ?= tectonic

.PHONY: chapter matiere poly clean

chapter:
	@test -n "$(FILE)" || (echo "Usage: make chapter FILE=chemin/du/chapitre.tex" && exit 1)
	cd $(dir $(FILE)) && $(ENGINE) $(notdir $(FILE))

matiere:
	@test -n "$(DIR)" || (echo "Usage: make matiere DIR=chemin/de/la/matiere" && exit 1)
	@set -e; for f in $(DIR)/[0-9][0-9]-*.tex; do \
	  echo "==> $$f"; \
	  (cd $(DIR) && $(ENGINE) $$(basename $$f)); \
	done

poly: matiere
	@set -e; main=$$(ls $(DIR)/main-*.tex 2>/dev/null | head -1); \
	if [ -n "$$main" ]; then \
	  echo "==> $$main"; \
	  (cd $(DIR) && $(ENGINE) $$(basename $$main)); \
	else \
	  echo "Aucun main-*.tex dans $(DIR)"; \
	fi

clean:
	@test -n "$(DIR)" || (echo "Usage: make clean DIR=chemin/de/la/matiere" && exit 1)
	rm -f $(DIR)/*.aux $(DIR)/*.log $(DIR)/*.out $(DIR)/*.toc $(DIR)/*.xdv $(DIR)/*.fls $(DIR)/*.fdb_latexmk
