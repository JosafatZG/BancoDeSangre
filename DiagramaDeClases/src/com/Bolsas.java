package com;

import java.util.Date;

public class Bolsas {
    private Long id;
    private TipoBolsa tipoBolsa;
    private Integer cantidad_ml;
    private Paciente donante;
    private Paciente receptor;
    private Date fechaDonacion;
    private Date fechaAplicacion;

    public Bolsas() {
    }

    public Bolsas(Long id, TipoBolsa tipoBolsa, Integer cantidad_ml, Paciente donante, Paciente receptor, Date fechaDonacion, Date fechaAplicacion) {
        this.id = id;
        this.tipoBolsa = tipoBolsa;
        this.cantidad_ml = cantidad_ml;
        this.donante = donante;
        this.receptor = receptor;
        this.fechaDonacion = fechaDonacion;
        this.fechaAplicacion = fechaAplicacion;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoBolsa getTipoBolsa() {
        return tipoBolsa;
    }

    public void setTipoBolsa(TipoBolsa tipoBolsa) {
        this.tipoBolsa = tipoBolsa;
    }

    public Integer getCantidad_ml() {
        return cantidad_ml;
    }

    public void setCantidad_ml(Integer cantidad_ml) {
        this.cantidad_ml = cantidad_ml;
    }

    public Paciente getDonante() {
        return donante;
    }

    public void setDonante(Paciente donante) {
        this.donante = donante;
    }

    public Paciente getReceptor() {
        return receptor;
    }

    public void setReceptor(Paciente receptor) {
        this.receptor = receptor;
    }

    public Date getFechaDonacion() {
        return fechaDonacion;
    }

    public void setFechaDonacion(Date fechaDonacion) {
        this.fechaDonacion = fechaDonacion;
    }

    public Date getFechaAplicacion() {
        return fechaAplicacion;
    }

    public void setFechaAplicacion(Date fechaAplicacion) {
        this.fechaAplicacion = fechaAplicacion;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Bolsas{");
        sb.append("id=").append(id);
        sb.append(", tipoBolsa=").append(tipoBolsa);
        sb.append(", cantidad_ml=").append(cantidad_ml);
        sb.append(", donante=").append(donante);
        sb.append(", receptor=").append(receptor);
        sb.append(", fechaDonacion=").append(fechaDonacion);
        sb.append(", fechaAplicacion=").append(fechaAplicacion);
        sb.append('}');
        return sb.toString();
    }
}
