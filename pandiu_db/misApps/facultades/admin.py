from django.contrib import admin
from misApps.facultades.models import Facultad, Programa

# Register your models here.

class ProgramaInline(admin.TabularInline):
    model = Programa
    extra = 1

class FacultadAdmin(admin.ModelAdmin):
    inlines = (ProgramaInline,)

admin.site.register(Facultad, FacultadAdmin)
