from django.contrib import admin
from misApps.publicaciones.models import Publicacion, TipoPublicacion,  PalabraClave, PublicacionPalabraClave

# Register your models here.



class PublicacionPalabraClaveInline(admin.TabularInline):
    model = PublicacionPalabraClave
    extra = 1

class PublicacionAdmin(admin.ModelAdmin):
    inlines = [ PublicacionPalabraClaveInline]

class TipoPublicacionAdmin(admin.ModelAdmin):
    pass


class PalabraClaveAdmin(admin.ModelAdmin):
    pass

admin.site.register(Publicacion, PublicacionAdmin)
admin.site.register(TipoPublicacion, TipoPublicacionAdmin)
admin.site.register(PalabraClave, PalabraClaveAdmin)
