package com;

import java.util.Date;

public class Paciente {
    private Long id;
    private String nombres;
    private String apellidos;
    private Date fechaNacimiento;
    private Genero genero;
    private TipoSangre tipoSangre;
    private TipoRH tipoRH;

    public Paciente() {
    }

    public Paciente(Long id, String nombres, String apellidos, Date fechaNacimiento, Genero genero, TipoSangre tipoSangre, TipoRH tipoRH) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.tipoSangre = tipoSangre;
        this.tipoRH = tipoRH;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public Genero getGenero() {
        return genero;
    }

    public void setGenero(Genero genero) {
        this.genero = genero;
    }

    public TipoSangre getTipoSangre() {
        return tipoSangre;
    }

    public void setTipoSangre(TipoSangre tipoSangre) {
        this.tipoSangre = tipoSangre;
    }

    public TipoRH getTipoRH() {
        return tipoRH;
    }

    public void setTipoRH(TipoRH tipoRH) {
        this.tipoRH = tipoRH;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Paciente{");
        sb.append("id=").append(id);
        sb.append(", nombres='").append(nombres).append('\'');
        sb.append(", apellidos='").append(apellidos).append('\'');
        sb.append(", fechaNacimiento=").append(fechaNacimiento);
        sb.append(", genero=").append(genero);
        sb.append(", tipoSangre=").append(tipoSangre);
        sb.append(", tipoRH=").append(tipoRH);
        sb.append('}');
        return sb.toString();
    }
}
