from django.contrib import admin
from .models import CustomUser
from django.utils.safestring import mark_safe


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['email', 'full_name', 'is_staff', 'profile_pic']
    
    def profile_pic(self, obj):
        return mark_safe(f'<img src="{obj.picture}" style="height:40px; border-radius:50%;" />') if obj.picture else '-'

    profile_pic.allow_tags = True  # For Django < 3.0
    profile_pic.short_description = 'Picture'
