from django.contrib import admin
from misApps.gruposDeInvestigacion.models import GrupoInvestigacion

# Register your models here.

class GrupoInvestigacionAdmin(admin.ModelAdmin):
    pass

admin.site.register(GrupoInvestigacion, GrupoInvestigacionAdmin)
