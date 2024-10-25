from django.contrib import admin
from misApps.usuarios.models import Usuario, TipoUsuario, UsuarioTipoUsuario

# Register your models here.

class TipoUsuarioInline(admin.TabularInline):
    model = UsuarioTipoUsuario
    extra = 1

class UsuarioAdmin(admin.ModelAdmin):
    inlines = (TipoUsuarioInline,)

class TipoUsuarioAdmin(admin.ModelAdmin):
    pass

admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(TipoUsuario, TipoUsuarioAdmin)
