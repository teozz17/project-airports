from django.db import models

class User(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.email


class Airport(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    link = models.URLField()
    icao = models.CharField(max_length=4)
    description = models.TextField()
    visited = models.BooleanField(default=False)

    def __str__(self):
        return self.name

